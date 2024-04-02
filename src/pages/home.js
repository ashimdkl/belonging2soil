import React, { useEffect, useState } from "react";
import layerBaseImage from "../img/layer-base.png";
import layerMiddleImage from "../img/layer-middle.png";
import layerFrontImage from "../img/layer-front.png";
import dungeonImage from "../img/dungeon.png";
import "./cssForHome.css";

const App = () => {
  const [shouldSway, setShouldSway] = useState(true);

  useEffect(() => {
    setShouldSway(true);
    const handleScroll = () => {
      let scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scrollTop", `${scrollY}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <div className ="main">
    <div className="wrapper">
      <div className="content">
        <header className="header-main">
          <div className="layers">
            <div className="layer-head">
              
              <div className="caption">Belonging2Soil</div>
              
              <div className="title">An Underground Virtual Reality Experience</div>
            </div>
            <div className="img-layer layer-base" style={{ backgroundImage: `url(${layerBaseImage})` }}></div>
            <div className={`img-layer layer-mid ${shouldSway ? "sway" : ""}`} style={{ backgroundImage: `url(${layerMiddleImage})` }}></div>
            <div className={`img-layer layer-front ${shouldSway ? "sway" : ""}`} style={{ backgroundImage: `url(${layerFrontImage})` }}></div>
          </div>
        </header>
        <article className="article-main" style={{ backgroundImage: `url(${dungeonImage})` }}>
          {/* Additional content and buttons can be added here */}
          <div className="copy">© ashim dhakal</div>
        </article>
      </div>
    </div>
  </div>
  );
};

export default App;
