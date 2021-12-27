import VolumeIcon from "./VolumeIcon";

const Volume = ({ volumeIcon, volumeFunc, barPosition, volumeWidth, mute }) => {
  return (
    <div className="volume">
      <VolumeIcon {...{ mute, volumeIcon }} />
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
  );
};

export default Volume;
