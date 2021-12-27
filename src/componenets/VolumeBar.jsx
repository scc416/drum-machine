import { VOLUME_START } from "../constants";

const VolumeBar = ({ volumeFunc, barPosition, volumeWidth }) => {
  return (
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
  );
};

export default VolumeBar;
