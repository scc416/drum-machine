import KeypadList from "./KeypadList";
import Display from "./Display";

const Player = (props) => {
  return (
    <div className="player">
      <Display {...props} />
      <KeypadList {...props} />
    </div>
  );
};

export default Player;
