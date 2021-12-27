import VolumeIcon from "./VolumeIcon";
import VolumeBar from "./VolumeBar";

const Volume = ({ volumeIcon, volumeFunc, barPosition, volumeWidth, mute }) => {
  return (
    <div className="volume">
      <VolumeIcon {...{ mute, volumeIcon }} />
      <VolumeBar {...{ volumeFunc, barPosition, volumeWidth }} />
    </div>
  );
};

export default Volume;
