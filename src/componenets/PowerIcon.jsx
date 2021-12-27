const PowerIcon = ({power, powerStyle}) => {
  return (
    <div id="power" style={powerStyle} onClick={power} className="clickable">
      <i className="fas fa-power-off" />
    </div>
  );
};

export default PowerIcon;
