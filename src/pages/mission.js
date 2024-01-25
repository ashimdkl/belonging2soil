import React, { useEffect } from 'react';
import './cssForMissionpage.css';

const Mission = () => {
  useEffect(() => {
    // Apply mission-background class to the body when the component mounts
    document.body.classList.add('mission-background');

    // Clean up the class when the component unmounts
    return () => {
      document.body.classList.remove('mission-background');
    };
  }, []);

  return (
    <div className="mission-container">
      <h1 className="mission-title">Learn About Us!</h1>
      <p className="mission-paragraph">
        "Belonging to Soil" is a collaborative virtual reality project that delves into the often
        overlooked realm beneath our feet, exploring the intricate world of soil ecosystems.
        Developed by a team of artists, designers, and computer scientists, this project aims to
        create an immersive experience allowing participants to "play" the roles of creatures
        inhabiting the underground. The project seeks to bridge the gap in our understanding of the
        complexity of soil ecosystems, which play a vital role in sustaining life on Earth. It
        emphasizes the importance of soil as a living, non-renewable resource crucial for human
        survival. By simulating and embodying the interactions between microfauna, mesofauna, and
        megafauna within the soil, the team hopes to raise awareness, foster empathy, and encourage
        responsible soil citizenship. The virtual reality experience starts above ground, guiding
        participants through tunnels into an underground chamber, showcasing the hidden world of soil
        life. Through playful and open-ended interactions, the project aims to convey the significance
        of soil ecosystems and address the challenges they face due to industrial agricultural
        practices. The team aspires to contribute to better soil stewardship, promoting biodiversity
        and sustainability for the benefit of all living organisms. "Belonging to Soil" represents a
        creative and educational initiative, shedding light on the often-unseen aspects of our
        environment and inspiring a deeper connection with the soil beneath our feet.
      </p>
      <div className="meet-the-team">
        <p className="meet-the-team-text">Meet the Team</p>
        <div className="team-member">
          <p>Amy Youngs | Addy Shadrick | Jian Chen | Ashim Dhakal | Nathan Garthwaite | Shuning Jiang | Isabel Nixon | Alena Sun</p>
        </div>
        {/* Repeat the structure for other team members */}
      </div>
    </div>
  );
};

export default Mission;
