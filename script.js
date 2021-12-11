// Redux:
const links = {
  Q: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-free-to-use-sounds/ftus_instrument_drum_large_gamelan_hit_single_001_472.mp3",
  W: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-free-to-use-sounds/ftus_instrument_drum_small_gamelan_hit_stick_single_002_478.mp3",
  E: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-14566/zapsplat_musical_cymbal_crash_tap_light_thin_stick_001_17604.mp3",
  A: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-free-to-use-sounds/ftus_musical_instrument_gender_gamelan_single_mallet_hit_mid_low_004_502.mp3",
  S: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-free-to-use-sounds/ftus_musical_instrument_gender_gamelan_single_mallet_hit_high_mid_001_489.mp3",
  D: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-46416/zapsplat_musical_triangle_single_strike_002_48598.mp3",
  Z: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-55112/zapsplat_musical_perscussion_shaker_maracas_kids_single_shake_002_61893.mp3",
  X: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-55112/zapsplat_musical_perscussion_tambourine_kids_set_down_61898.mp3",
  C: "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-free-to-use-sounds/ftus_musical_instrument_ching_gamelan_single_hit_001_529.mp3" };


const instrument = {
  Q: "Drum 1",
  W: "Drum 2",
  E: "Crash Cymbal",
  A: "Gendèr 1",
  S: "Gendèr 2",
  D: "Triangle",
  Z: "Shaker",
  X: "Tambourine",
  C: "Finger Cymbals" };


const PLAY = "PLAY";
const CLASSCHANGE = "CLASSCHANGE";
const ENDED = "ENDED";
const POWER = "POWER";
const VOLUMESTART = "VOLUMESTART";
const VOLUMEEND = "VOLUMEEND";
const MUTE = "MUTE";

let mute = { type: MUTE };

const power = { type: POWER };

const ending = key => {
  if (key == store.getState().key) {
    return { type: ENDED };
  } else {
    return { type: null };
  }

};

const play = (key, volume) => {
  if (
  key == "Q" ||
  key == "W" ||
  key == "E" ||
  key == "A" ||
  key == "S" ||
  key == "D" ||
  key == "Z" ||
  key == "X" ||
  key == "C")
  {
    let audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    return { type: PLAY, key: key };
  } else {
    return { type: null };
  }
};

const classChange = (time, key) => {
  return { type: CLASSCHANGE };
};

const playingStyle = key => {
  let state = store.getState();
  if (state.key == key && state.class) {
    return {
      //color: "black",
      "text-shadow": "1.5px 1.5px 1px grey" };

  } else {
    return {};
  }
};

const powerStyle = on => {
  if (on) {
    return {};
  } else {
    return {
      "text-shadow": "none",
      "color": "grey" };

  }
};

const hideScreen = on => {
  if (on) {
    return {};
  } else {
    return {
      "visibility": "hidden" };

  }
};

const volume = num => {
  const position = document.getElementById("volume-bar-background").getBoundingClientRect().left;
  let newNum = num - position;
  if (newNum > 160) {
    newNum = 160;
  } else if (newNum < 0) {
    newNum = 0;
  }
  return newNum / 160;
};

const volumeStart = num => {
  return { type: VOLUMESTART, newVolume: volume(num) };
};

const volumeEnd = num => {
  return { type: VOLUMEEND, newVolume: volume(num) };
};

const barPosition = (volume, muted) => {
  const v = muted ? 0 : volume;
  return {
    right: (1 - v) * 160 + "px" };

};

const volumeWidth = (volume, muted) => {
  const v = muted ? 0 : volume;
  if (muted) {
    return { width: "0px" };
  } else {
    return { width: volume * 160 + "px" };
  }

};

const volumeIcon = (volume, muted) => {
  if (muted) {
    return "fas fa-volume-mute";
  } else if (volume == 0) {
    return "fas fa-volume-off";
  } else if (volume > 0.6) {
    return "fas fa-volume-up";
  } else {
    return "fas fa-volume-down";
  }
};

const reducer = (state = {
  key: null,
  class: false,
  on: true,
  volume: 0.61,
  volumeChanging: false,
  muted: false },

action) => {
  let newState = { ...state };
  switch (action.type) {
    case PLAY:
      newState.key = action.key;
      newState.class = true;
      return newState;
    case CLASSCHANGE:
      newState.class = false;
      return newState;
    case ENDED:
      newState.class = false;
      newState.key = null;
      return newState;
    case POWER:
      newState.on = !state.on;
      return newState;
    case VOLUMESTART:
      newState.volumeChanging = true;
      newState.volume = action.newVolume;
      newState.muted = false;
      return newState;
    case VOLUMEEND:
      newState.volumeChanging = false;
      newState.volume = action.newVolume;
      newState.muted = false;
      return newState;
    case MUTE:
      newState.muted = !state.muted;
      return newState;
    default:
      return state;}

};

const store = Redux.createStore(reducer);

// React:
class TopLevel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const padElement = key => {
      return /*#__PURE__*/(
        React.createElement("div", {
          id: "pad-" + key,
          className: "drum-pad clickable",
          onClick: () => this.props.play(key, this.props.on, this.props.volume, this.props.muted),
          style: playingStyle(key) }, /*#__PURE__*/
        React.createElement("audio", {
          id: key,
          className: "clip",
          onTimeUpdate: event => this.props.classChange(event.target.currentTime, key, this.props.state),
          onEnded: () => this.props.ending(key, this.props.state),
          src: links[key] }),
        key));


    };
    return /*#__PURE__*/(
      React.createElement("div", {
        onMouseUp: e => this.props.volumeEnd(e.clientX, this.props.volumeChanging),
        onMouseMove: e => this.props.volumeStart(e.clientX, this.props.volumeChanging),
        tabIndex: "0",
        id: "drum-machine",
        onKeyPress:
        e => this.props.play(e.key.toUpperCase(), this.props.on, this.props.volume, this.props.muted) }, /*#__PURE__*/
      React.createElement("div", { className: "player" }, /*#__PURE__*/
      React.createElement("div", { id: "display" }, /*#__PURE__*/
      React.createElement("div", { style: hideScreen(this.props.on) }, /*#__PURE__*/
      React.createElement("span", { className: "title" }, "Drums and Percussion"), /*#__PURE__*/


      React.createElement("div", { className: "show" },
      instrument[this.props.state]), /*#__PURE__*/

      React.createElement("div", { className: "control" }, /*#__PURE__*/
      React.createElement("div", { className: "volume" }, /*#__PURE__*/
      React.createElement("div", {
        onMouseDown: this.props.mute,
        className: "clickable to-be-clicked" }, /*#__PURE__*/
      React.createElement("i", {
        className: volumeIcon(this.props.volume, this.props.muted) })), /*#__PURE__*/



      React.createElement("div", {
        className: "volume-bar clickable",
        onMouseDown: e => this.props.volumeStart(e.clientX, true) }, /*#__PURE__*/


      React.createElement("div", {
        id: "volume-bar-background" }), /*#__PURE__*/
      React.createElement("div", {
        className: "drag-bar",
        style: barPosition(this.props.volume, this.props.muted) }, /*#__PURE__*/

      React.createElement("div", {
        id: "volume-bar",
        style: volumeWidth(this.props.volume, this.props.muted) }, /*#__PURE__*/

      React.createElement("div", {
        id: "drag" }))))), /*#__PURE__*/





      React.createElement("div", {
        id: "power",
        style: powerStyle(this.props.on),
        onClick: this.props.power,
        className: "clickable" }, /*#__PURE__*/
      React.createElement("i", { class: "fas fa-power-off" }))))), /*#__PURE__*/





      React.createElement("div", { className: "circle-container" },
      padElement("D"),
      padElement("C"),
      padElement("X"),
      padElement("Z"),
      padElement("A"),
      padElement("Q"),
      padElement("W"),
      padElement("E"),
      padElement("S"), /*#__PURE__*/
      React.createElement("div", { className: "circle" }))), /*#__PURE__*/


      React.createElement("div", { className: "footer" }, "Design cloned from\xA0", /*#__PURE__*/
      React.createElement("a", {
        href: "https://www.csaimages.com/preview.asp?image=837422&itemw=4&itemf=0001&itemstep=1&itemx=2",
        target: "_blank" }, "CSA IMAGES"))));






  }}


// React-Redux
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

const mapStateToProps = state => {
  return {
    state: state.key,
    class: state.class,
    on: state.on,
    volume: state.volume,
    volumeChanging: state.volumeChanging,
    muted: state.muted };

};

const mapDispatchToProps = dispatch => {
  return {
    play: (key, on, volume, muted) => {
      if (on) {
        if (muted) {
          dispatch(play(key, 0));
        } else {
          dispatch(play(key, volume));
        }
      }
    },
    classChange: (time, key, currentKey) => {
      if (key == currentKey && time > 1.0) dispatch(classChange(time, key));
    },
    ending: (key, currentKey) => {
      if (key == currentKey) dispatch(ending(key));
    },
    power: () => dispatch(power),
    mute: () => {
      dispatch(mute);
    },
    volumeEnd: (position, changing) => {
      if (changing) dispatch(volumeEnd(position));
    },
    volumeStart: (num, boolean) => {
      if (boolean) dispatch(volumeStart(num));
    } };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(TopLevel);

class AppWrapper extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement(Container, null)));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(AppWrapper, null), document.getElementById("app"));