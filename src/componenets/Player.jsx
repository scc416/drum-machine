import KeypadList from "./KeypadList";
import { VOLUME_START } from "../constants";

const Player = ({
  volumeIcon,
  volumeFunc,
  barPosition,
  volumeWidth,
  play,
  playingStyle,
  ending,
  hideScreen,
  currentInstument,
  mute,
  powerStyle,
  power
}) => {
  return (
    <div className="player">
      <div id="display">
        <div style={hideScreen}>
          <span className="title">Drums and Percussion</span>
          <div className="show">{currentInstument}</div>
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
  );
};

export default Player;
