import "./App.css";
import { instruments } from "./constants";
import useData from "./hooks/useData";
import KeypadList from "./componenets/KeypadList";
import Footer from "./componenets/Footer"

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
    powerStyle,
    volumeWidth,
    volumeMove,
    playingStyle,
    ending,
  } = useData();

  return (
    <div
      onMouseUp={volumeEnd}
      onMouseMove={volumeMove}
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
                style={powerStyle}
                onClick={power}
                className="clickable"
              >
                <i className="fas fa-power-off" />
              </div>
            </div>
          </div>
        </div>
        <KeypadList {...{ play, playingStyle, ending }} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
