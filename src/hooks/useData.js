import { useReducer } from "react";
import {
  PLAY,
  ENDED,
  POWER,
  VOLUME_START,
  VOLUME_END,
  MUTE,
  VOLUME_MOVE,
  keys,
  instruments,
} from "../constants";

const getVolume = (num) => {
  const position = document
    .getElementById("volume-bar-background")
    .getBoundingClientRect().left;

  const newNum = num - position;
  if (newNum > 160) return 1;
  if (newNum < 0) return 0;
  return newNum / 160;
};

const useData = () => {
  const reducers = {
    [VOLUME_MOVE]: (state, { newVolume }) => {
      if (!state.volumeChanging) return state;
      return {
        ...state,
        volume: newVolume,
        muted: false,
      };
    },
    [PLAY]: (state, { key }) => {
      return { ...state, key, playing: true };
    },
    [ENDED]: (state) => {
      return { ...state, playing: false, key: null };
    },
    [POWER]: (state) => {
      const { on, key: currentKey } = state;
      const key = on ? null : currentKey;
      return { ...state, on: !on, key };
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
    playing: false,
    on: true,
    volume: 0.61,
    volumeChanging: false,
    muted: false,
  });

  const { volumeChanging, on, muted, key, volume, playing } = state;

  const volumeWidth = () => {
    const v = muted ? 0 : volume;
    if (muted) {
      return { width: "0px" };
    } else {
      return { width: volume * 160 + "px" };
    }
  };

  const volumeFunc = (type) => {
    return ({ clientX }) => {
      dispatch({ type, newVolume: getVolume(clientX) });
    };
  };

  const mute = () => {
    dispatch({ type: MUTE });
  };

  const play = (rawKey, valid) => {
    const key = valid ? rawKey : rawKey.key.toUpperCase();
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
    if (thisKey === key && playing) {
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

  const currentInstument = instruments[key];

  return {
    playingStyle,
    ending,
    powerStyle,
    volumeFunc,
    volumeChanging,
    volume,
    muted,
    play,
    mute,
    hideScreen,
    currentInstument,
    power,
    volumeIcon,
    barPosition,
    volumeWidth,
  };
};

export default useData;
