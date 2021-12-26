import { useReducer } from "react";
import {
  PLAY,
  CLASS_CHANGE,
  ENDED,
  POWER,
  VOLUME_START,
  VOLUME_END,
  MUTE,
  soundLinks
} from "../constants";

const getVolume = (num) => {
  const position = document
    .getElementById("volume-bar-background")
    .getBoundingClientRect().left;
  let newNum = num - position;
  if (newNum > 160) {
    newNum = 160;
  } else if (newNum < 0) {
    newNum = 0;
  }
  return newNum / 160;
};

const useData = () => {
  const reducers = {
    [PLAY]: (state, { key }) => {
      return { ...state, key, classes: true };
    },
    [CLASS_CHANGE]: (state) => {
      return { ...state, classes: false };
    },
    [ENDED]: (state) => {
      return { ...state, classes: false, key: null };
    },
    [POWER]: (state) => {
      return { ...state, on: !state.on };
    },
    [VOLUME_START]: (state, { newVolume }) => {
      return {
        ...state,
        volumeChanging: true,
        volume: newVolume,
        muted: false,
      };
    },
    [VOLUME_END]: (state, { newVolume }) => {
      return {
        ...state,
        volumeChanging: false,
        volume: newVolume,
        muted: false,
      };
    },
    [MUTE]: (state) => {
      return { state, muted: !state.muted };
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    key: null,
    classes: false,
    on: true,
    volume: 0.61,
    volumeChanging: false,
    muted: false,
  });

  const { volumeChanging, on, muted, key, volume, classes } = state;

  const volumeEnd = (num) => {
    dispatch({ type: VOLUME_END, newVolume: getVolume(num) });
  };

  const volumeStart = (num) => {
    dispatch({ type: VOLUME_START, newVolume: getVolume(num) });
  };

  const mute = () => dispatch({ type: MUTE });

  const play = (key) => {
    if (
      key === "Q" ||
      key === "W" ||
      key === "E" ||
      key === "A" ||
      key === "S" ||
      key === "D" ||
      key === "Z" ||
      key === "X" ||
      key === "C"
    ) {
      let audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
      return { type: PLAY, key: key };
    } else {
      return { type: null };
    }
  };

  const power = () => dispatch({ type: POWER });

  const hideScreen = on ? {} : { visibility: "hidden" };

  const volumeIcon = () => {
    if (muted) {
      return "fas fa-volume-mute";
    } else if (volume === 0) {
      return "fas fa-volume-off";
    } else if (volume > 0.6) {
      return "fas fa-volume-up";
    } else {
      return "fas fa-volume-down";
    }
  };

  const barPosition = () => {
    const v = muted ? 0 : volume;
    return {
      right: (1 - v) * 160 + "px"
    };
  }

  const playingStyle = (thisKey) => {  
    if (thisKey === key && classes) {
      return {
        "text-shadow": "1.5px 1.5px 1px grey"
      };
    } else {
      return {};
    }
  };

  const padElement = (key) => {
    return (
      <div
        id={"pad-" + key}
        className="drum-pad clickable"
        onClick={() => play(key)}
        style={playingStyle(key)}
      >
        <audio
          id={key}
          className="clip"
          onTimeUpdate={
            () => console.log("onTImeupdate")
            // (event) =>
            // this.props.classChange(
            //   event.target.currentTime,
            //   key,
            //   this.props.state
            // )
          }
          onEnded={
            () => console.log("HI")
            // this.props.ending(key, this.props.state)
          }
          src={soundLinks[key]}
        />
        {key}
      </div>
    );
  };

  return {
    padElement,
    volumeEnd,
    volumeChanging,
    volumeStart,
    on,
    volume,
    muted,
    play,
    mute,
    hideScreen,
    key,
    power,
    volumeIcon,
    barPosition
  };
};

export default useData;
