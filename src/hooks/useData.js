import { useReducer } from "react";
import {
  PLAY,
  CLASS_CHANGE,
  ENDED,
  POWER,
  VOLUME_START,
  VOLUME_END,
  MUTE,
} from "../constants";

const volume = (num) => {
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
      return { ...state, key, class: true };
    },
    [CLASS_CHANGE]: (state) => {
      return { ...state, class: false };
    },
    [ENDED]: (state) => {
      return { ...state, class: false, key: null };
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

  const volumeEnd = (num) => {
    return { type: VOLUME_END, newVolume: volume(num) };
  };

  const volumeStart = (num) => {
    return { type: VOLUME_START, newVolume: volume(num) };
  };

  const mute = { type: MUTE };

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
      key == "C"
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

  const [state, dispatch] = useReducer(reducer, {
    key: null,
    class: false,
    on: true,
    volume: 0.61,
    volumeChanging: false,
    muted: false,
  });

  const { volumeChanging, on, volume, muted } = state;

  return {
    volumeEnd,
    volumeChanging,
    volumeStart,
    on,
    volume,
    muted,
    play,
    mute,
  };
};

export default useData;
