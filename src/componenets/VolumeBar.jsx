import { VOLUME_START } from "../constants";

const VolumeBar = ({ volumeFunc, barPosition, volumeWidth }) => {
  return (
    <div
      className="volume-bar clickable"
      onMouseDown={volumeFunc(VOLUME_START)}
    >
      <div id="volume-bar-background" />
      <div className="drag-bar" style={barPosition}>
        <div className="bright-volume-bar" style={volumeWidth}>
          <div className="drag" />
        </div>
      </div>
    </div>
  );
};

export default VolumeBar;
