import KeypadListItem from "./KeypadListItem";
import { keys } from "../constants";

const KeypadList = ({ play, playingStyle, ending }) => {
  const elmList = keys.map((key) => {
    return <KeypadListItem {...{ key, play, playingStyle, ending, char: key }} />;
  });
  return (
    <div className="circle-container">
      {elmList}
      <div className="circle" />
    </div>
  );
};

export default KeypadList;
