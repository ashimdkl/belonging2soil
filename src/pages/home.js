import React, { useEffect } from "react";
import layerBaseImage from "../img/layer-base.png";
import layerMiddleImage from "../img/layer-middle.png";
import layerFrontImage from "../img/layer-front.png";
import dungeonImage from "../img/dungeon.png";
import Button from "../components/button";
import "./cssForHome.css"; // Corrected import statement


function App() {
    useEffect(() => {
      window.addEventListener("scroll", () => {
        let scrollY = window.scrollY; 
        document.documentElement.style.setProperty("--scrollTop", `${scrollY}px`);
      });
    }, []);
  
    return (
      <>
        <div className="wrapper">
          <div className="content">
            <header className="header-main">
              <div className="layers">
                <div className="layer-head">
                  <div className="caption">Belonging2Soil</div>
                  <div className="title">An Underground Virtual Reality Experience</div>
                </div>
                <div
                  className="img-layer layer-base"
                  style={{ backgroundImage: `url(${layerBaseImage})` }}
                ></div>
                <div
                  className="img-layer layer-mid"
                  style={{ backgroundImage: `url(${layerMiddleImage})` }}
                ></div>
                <div
                  className="img-layer layer-front"
                  style={{ backgroundImage: `url(${layerFrontImage})` }}
                ></div>
              </div>
            </header>
            <article
              className="article-main"
              style={{ backgroundImage: `url(${dungeonImage})` }}
            >
              {/* Button 1 */}
              <Button
                onClick={() => (window.location.href = '/mission')}
                label="Mission Plan!"
                top="425px"
                left="295px"
              />
  
              {/* Button 2 */}
              <Button
                onClick={() => (window.location.href = '/contribute')}
                label="Interact & Contribute!"
                top="793px"
                left="390px"
              />
              {/* Button 3 */}
              <Button
                onClick={() =>(window.location.href = '/gallery')}
                label="Gallery!"
                top="695px"
                left="1060px"
              />
              {/* Button 4 */}
              <Button
                onClick={() => window.location.href = 'YOUR_AI_URL'}
                label="Learn About Our Ai!"
                top="415px"
                left="1530px"
              />
              {/* Button 5 */}
              <Button
                onClick={() => (window.location.href = '/blog')}
                label="Blog!"
                top="655px"
                left="1340px"
              />
              <div className="copy">© ashim dhakal</div>
            </article>
          </div>
        </div>
      </>
    );
  }
  
  export default App;