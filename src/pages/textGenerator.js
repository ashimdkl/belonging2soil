import React, { useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import chatGptLogo from "./chatgpt-icon-svg.svg";
import './textGenerator.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

function TextGenerator() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: "Hello, I am Belonging2Soil Barry. How can I help you today?",
            sender: "B2SBarry",
        }
    ]);

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
        <div className="App">
            <div style={{ position: "relative", height: "800px", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            typingIndicator={typing ? <TypingIndicator content='Barry is typing...' /> : null}
                        >
                            {messages.map((message, i) => (
                                <Message key={i} model={message} />
                            ))}
                        </MessageList>
                        <MessageInput placeholder='Type your question here!' onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default TextGenerator;
