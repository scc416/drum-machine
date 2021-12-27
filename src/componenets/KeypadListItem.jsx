import { soundLinks } from "../constants";

const KeypadListItem = ({ char, play, playingStyle, ending }) => {
  return (
    <div
      id={"pad-" + char}
      className="drum-pad clickable"
      onClick={() => play(char, true)}
      style={playingStyle(char)}
    >
      <audio
        id={char}
        className="clip"
        onEnded={() => ending(char)}
        src={soundLinks[char]}
      />
      {char}
    </div>
  );
};

export default KeypadListItem;
