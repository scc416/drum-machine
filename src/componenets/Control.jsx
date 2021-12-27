import PowerIcon from "./PowerIcon";
import Volume from "./Volume";

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
      <Volume {...{ volumeIcon, volumeFunc, barPosition, volumeWidth, mute }} />
      <PowerIcon {...{ power, powerStyle }} />
    </div>
  );
};

export default Control;
