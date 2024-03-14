import React, { useState, useRef } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './imageGenerator.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl] = useState("/");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am Belonging2Soil Barry. How can I help you today?",
      sender: "B2SBarry",
    }
  ]);
  const inputRef = useRef(null);

   // New state for the randomization feature
   const [randomCharacter, setRandomCharacter] = useState('');
   const [isRandomizing, setIsRandomizing] = useState(false);

  const characters = ["earthworm", "millipede", "bacteria", "springtail", "centipede", "water bear"];
  const goals = ["get food!", "survive the day!", "find a mate!", "explore the world!", "find a new home!", "escape predators!"];
  const feelings = ["sad", "happy", "hungry", "upset", "excited", "tired", "energetic", "bored", "angry", "anxious", "calm", "confused", "content", "depressed", "disappointed", "disgusted", "distracted", "embarrassed", "enthusiastic", "frustrated", "grateful", "guilty", "hopeful", "hurt", "interested", "jealous", "lonely", "loved", "nervous", "overwhelmed", "peaceful", "proud", "relieved", "sad", "scared", "shocked", "silly", "stressed", "surprised", "thankful", "uncomfortable", "worried"];
  const randomizeCharacter = () => {
    setIsRandomizing(true);
  
    // Randomly select one item from each array
    const character = characters[Math.floor(Math.random() * characters.length)];
    const goal = goals[Math.floor(Math.random() * goals.length)];
    const feeling = feelings[Math.floor(Math.random() * feelings.length)];
  
    // Concatenate the selections into a single message
    const message = `You are a ${character}, you want to ${goal} and you're feeling ${feeling}.`;
  
    // Update state with the new message
    setRandomCharacter(message);
  
    setIsRandomizing(false);
  };
  
  
  const supabase = useSupabaseClient();

  const generateImage = async () => {
    if (inputRef.current.value === "") {
      alert("Please enter a prompt.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: inputRef.current.value,
          n: 1,
          size: "512x512",
        }),
      });

      const data = await response.json();
      const imageUrl = data.data[0].url;
      setImageUrl(imageUrl);

      await supabase.from('generated_images').insert([{ url: imageUrl }]);
    } catch (error) {
      console.error("Error generating or storing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "B2SBarry" ? "assistant" : "user";
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        ...apiMessages
      ]
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => data.json())
      .then((data) => {
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "B2SBarry"
        }]);
        setTyping(false);
      });
  }

  return (
    <div className="container">
      <div className="left-panel">
        <MainContainer>
          <ChatContainer>
          <MessageList
            typingIndicator={typing ? <TypingIndicator content='Barry is typing...' /> : null}
          >
          {messages.map((message, i) => (
          <Message
            key={i}
           model={{...message,message: `${message.sender === "user" ? "User" : "Barry"}: ${message.message}`,
      }}
      className={message.sender === "user" ? "user-message" : "ai-message"}/>))}
          </MessageList>

          <MessageInput placeholder="Type your question here!" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>

        {/* New container for the randomization feature */}
          <div className="randomizer-container">
          <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Click to randomize your character!</div>
            <button onClick={randomizeCharacter} disabled={isRandomizing} className="randomize-btn">Randomize!</button> 
              {randomCharacter && !isRandomizing && <div>{randomCharacter}</div>}
          </div>

      </div>
      <div className="right-panel">
        <div className="imageGenerator">
          <div className="header">Belonging2Soil AI Image Generator</div>
          <div className="img-loading">
            {/* Loading image */}
            {isLoading && (
              <div className="img-loading-image">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/011/299/153/small/simple-loading-or-buffering-icon-design-png.png" alt="loading icon" />
              </div>
            )}
            <div className="img-loading-text">{isLoading ? 'Loading Your Image Please wait.' : 'Your Generated Image'}</div>
            {/* Render the generated image if it exists */}
            {!isLoading && imageUrl !== "/" && (
              <div className="image">
                <img src={imageUrl} alt="generated image" />
              </div>
            )}
          </div>
          <div className="search-box">
            <input ref={inputRef} type="text" className='search-input' placeholder='Describe your image...' />
            <div className="generate-btn" onClick={generateImage}>Generate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;