import { VOLUME_START } from "../constants";
import Power from "./Power";

const Display = ({
  volumeIcon,
  volumeFunc,
  barPosition,
  volumeWidth,
  hideScreen,
  currentInstument,
  mute,
  powerStyle,
  power,
}) => {
  return (
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
          <Power {...{ power, powerStyle }} />
        </div>
      </div>
    </div>
  );
};

export default Display;
