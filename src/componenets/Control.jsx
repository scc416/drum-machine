import Power from "./Power";
import { VOLUME_START } from "../constants";

const Control = (props) => {
  const {
    volumeIcon,
    volumeFunc,
    barPosition,
    volumeWidth,
    mute,
    powerStyle,
    power,
  } = props;
  return (
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
          <div className="drag-bar" style={barPosition}>
            <div id="volume-bar" style={volumeWidth}>
              <div id="drag" />
            </div>
          </div>
        </div>
      </div>
      <Power {...{ power, powerStyle }} />
    </div>
  );
};

export default Control;
