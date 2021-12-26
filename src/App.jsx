import "./App.css";
import { soundLinks, instruments } from "./constants";
import useData from "./hooks/useData";

const padElement = (key) => {
  return (
    <div
      id={"pad-" + key}
      className="drum-pad clickable"
      onClick={() =>console.log("CLICK")
        // this.props.play(key, this.props.on, this.props.volume, this.props.muted)
      }
      // style={playingStyle(key)}
    >
      <audio
        id={key}
        className="clip"
        onTimeUpdate={ () => console.log("onTImeupdate")
          // (event) =>
          // this.props.classChange(
          //   event.target.currentTime,
          //   key,
          //   this.props.state
          // )
        }
        onEnded={() => console.log("HI")
          // this.props.ending(key, this.props.state)
        }
        src={soundLinks[key]}
      />
      {key}
    </div>
  );
};

const App = () => {
  const { volumeEnd, volumeChanging, volumeStart, on, volume, muted, play, hideScreen } = useData();
  return (
    <div
      onMouseUp={(e) => volumeEnd(e.clientX, volumeChanging)}
      onMouseMove={
        (e) => volumeStart(e.clientX, volumeChanging)
      }
      tabIndex="0"
      id="drum-machine"
      onKeyPress={
        (e) =>
        play(
          e.key.toUpperCase(),
          on,
          volume,
          muted
        )
      }
    >
      <div className="player">
        <div id="display">
          <div 
          style={hideScreen}
            >
            <span className="title">Drums and Percussion</span>
            <div className="show">
              {/* {instrument[this.props.state]} */}
              </div>
            <div className="control">
              <div className="volume">
                <div
                  // onMouseDown={this.props.mute}
                  className="clickable to-be-clicked"
                >
                  <i
                    // className={volumeIcon(this.props.volume, this.props.muted)}
                  />
                </div>

                <div
                  className="volume-bar clickable"
                  // onMouseDown={(e) => this.props.volumeStart(e.clientX, true)}
                >
                  <div id="volume-bar-background" />
                  <div
                    className="drag-bar"
                    // style={barPosition(this.props.volume, this.props.muted)}
                  >
                    <div
                      id="volume-bar"
                      // style={volumeWidth(this.props.volume, this.props.muted)}
                    >
                      <div id="drag" />
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="power"
                // style={powerStyle(this.props.on)}
                // onClick={this.props.power}
                className="clickable"
              >
                <i class="fas fa-power-off" />
              </div>
            </div>
          </div>
        </div>
        <div className="circle-container">
          {padElement("D")}
          {padElement("C")}
          {padElement("X")}
          {padElement("Z")}
          {padElement("A")}
          {padElement("Q")}
          {padElement("W")}
          {padElement("E")}
          {padElement("S")}
          <div className="circle" />
        </div>
      </div>
      <div className="footer">
        Design cloned from&nbsp;
        <a
          href="https://www.csaimages.com/preview.asp?image=837422&itemw=4&itemf=0001&itemstep=1&itemx=2"
          target="_blank"
        >
          CSA IMAGES
        </a>
      </div>
    </div>
  );
};

export default App;
