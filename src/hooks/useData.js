import { useReducer } from "react";
import {
  PLAY,
  ENDED,
  POWER,
  VOLUME_START,
  VOLUME_END,
  MUTE,
  soundLinks,
  VOLUME_MOVE,
  keys,
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
    [VOLUME_MOVE]: (state, { newVolume }) => {
      return {
        ...state,
        volume: newVolume,
        muted: false,
      };
    },
    [PLAY]: (state, { key }) => {
      return { ...state, key, classes: true };
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
      if (state.volumeChanging) {
        return {
          ...state,
          volumeChanging: false,
          volume: newVolume,
          muted: false,
        };
      }
      return state;
    },
    [MUTE]: (state) => {
      return { ...state, muted: !state.muted };
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

  const volumeWidth = () => {
    const v = muted ? 0 : volume;
    if (muted) {
      return { width: "0px" };
    } else {
      return { width: volume * 160 + "px" };
    }
  };

  const volumeEnd = ({ clientX }) => {
    dispatch({ type: VOLUME_END, newVolume: getVolume(clientX) });
  };

  const volumeStart = ({ clientX }) => {
    dispatch({ type: VOLUME_START, newVolume: getVolume(clientX) });
  };

  const volumeMove = ({ clientX }) => {
    if (volumeChanging) {
      dispatch({ type: VOLUME_MOVE, newVolume: getVolume(clientX) });
    }
  };

  const mute = () => {
    dispatch({ type: MUTE });
  };

  const play = (key) => {
    const keyExists = keys.includes(key);
    if (keyExists) {
      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.volume = volume;
      audio.muted = muted;
      audio.play();
      dispatch({ type: PLAY, key });
    }
  };

  const power = () => dispatch({ type: POWER });

  const hideScreen = on ? {} : { visibility: "hidden" };

  const powerStyle = on ? {} : { textShadow: "none", color: "grey" };

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
      right: (1 - v) * 160 + "px",
    };
  };

  const playingStyle = (thisKey) => {
    if (thisKey === key && classes) {
      return {
        textShadow: "1.5px 1.5px 1px grey",
      };
    } else {
      return {};
    }
  };

  const ending = (thisKey) => {
    if (thisKey == key) {
      dispatch({ type: ENDED });
    }
  };

  return {
    playingStyle,
    ending,
    powerStyle,
    volumeEnd,
    volumeChanging,
    volumeStart,
    volume,
    muted,
    play,
    mute,
    hideScreen,
    key,
    power,
    volumeIcon,
    barPosition,
    volumeWidth,
    volumeMove,
  };
};

export default useData;
