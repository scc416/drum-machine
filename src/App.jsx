import "./App.css";
import { soundLinks, instruments } from "./constants";
import useData from "./hooks/useData";

const App = () => {
  const {
    volumeEnd,
    volumeStart,
    barPosition,
    play,
    hideScreen,
    key,
    mute,
    power,
    volumeIcon,
    padElement,
    powerStyle,
    volumeWidth,
  } = useData();
  return (
    <div
      onMouseUp={(e) => volumeEnd(e.clientX)}
      onMouseMove={(e) => volumeStart(e.clientX)}
      tabIndex="0"
      id="drum-machine"
      onKeyPress={(e) => play(e.key.toUpperCase())}
    >
      <div className="player">
        <div id="display">
          <div style={hideScreen}>
            <span className="title">Drums and Percussion</span>
            <div className="show">{instruments[key]}</div>
            <div className="control">
              <div className="volume">
                <div onMouseDown={mute} className="clickable to-be-clicked">
                  <i className={volumeIcon()} />
                </div>

                <div
                  className="volume-bar clickable"
                  onMouseDown={(e) => volumeStart(e.clientX)}
                >
                  <div id="volume-bar-background" />
                  <div className="drag-bar" style={barPosition()}>
                    <div id="volume-bar" style={volumeWidth()}>
                      <div id="drag" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="power"
                style={powerStyle()}
                onClick={power}
                className="clickable"
              >
                <i className="fas fa-power-off" />
              </div>
            </div>
          </div>
        </div>
        <div className="circle-container">
          {padElement("D")}
          {padElement("C")}
          {padElement("X")}
          {padElement("Z")}
          {padElement("A")}
          {padElement("Q")}
          {padElement("W")}
          {padElement("E")}
          {padElement("S")}
          <div className="circle" />
        </div>
      </div>
      <div className="footer">
        Design cloned from&nbsp;
        <a
          href="https://www.csaimages.com/preview.asp?image=837422&itemw=4&itemf=0001&itemstep=1&itemx=2"
          target="_blank"
        >
          CSA IMAGES
        </a>
      </div>
    </div>
  );
};

export default App;
