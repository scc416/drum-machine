import Control from "./Control";

const Display = (props) => {
  const { hideScreen, currentInstument } = props;
  return (
    <div id="display">
      <div style={hideScreen}>
        <span className="title">Drums and Percussion</span>
        <div className="show">{currentInstument}</div>
        <Control {...props} />
      </div>
    </div>
  );
};

export default Display;
