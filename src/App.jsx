import "./App.css";
import { VOLUME_MOVE, VOLUME_END } from "./constants";
import useData from "./hooks/useData";
import Player from "./componenets/Player";
import Footer from "./componenets/Footer";

const App = () => {
  const props = useData();
  const { play, volumeFunc } = props;

  return (
    <div
      onMouseUp={volumeFunc(VOLUME_END)}
      onMouseMove={volumeFunc(VOLUME_MOVE)}
      tabIndex="0"
      className="drum-machine"
      onKeyPress={play}
    >
      <Player {...props} />
      <Footer />
    </div>
  );
};

export default App;
