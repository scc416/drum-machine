import Power from "./PowerIcon";
import { VOLUME_START } from "../constants";
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
      <Power {...{ power, powerStyle }} />
    </div>
  );
};

export default Control;
