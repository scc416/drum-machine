import "./App.css";
import { instruments, VOLUME_START, VOLUME_MOVE, VOLUME_END } from "./constants";
import useData from "./hooks/useData";
import KeypadList from "./componenets/KeypadList";
import Footer from "./componenets/Footer"

const App = () => {
  const {
    barPosition,
    play,
    hideScreen,
    key,
    mute,
    power,
    volumeIcon,
    powerStyle,
    volumeWidth,
    volumeFunc,
    playingStyle,
    ending,
  } = useData();

  return (
    <div
      onMouseUp={volumeFunc(VOLUME_END)}
      onMouseMove={volumeFunc(VOLUME_MOVE)}
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
                  onMouseDown={volumeFunc(VOLUME_START)}
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
