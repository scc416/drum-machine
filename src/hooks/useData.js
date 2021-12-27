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
import { getVolume } from "../helper";

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
      return { ...state, key };
    },
    [ENDED]: (state) => {
      return { ...state, key: null };
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
    on: true,
    volume: 0.61,
    volumeChanging: false,
    muted: false,
  });

  const { on, muted, key, volume } = state;

  const actualVolume = muted ? 0 : volume;
  const volumeWidth = { width: actualVolume * 160 + "px" };
  const barPosition = { right: (1 - actualVolume) * 160 + "px" };

  const currentInstument = instruments[key];

  const volumeFunc = (type) => {
    return ({ clientX }) => {
      dispatch({ type, newVolume: getVolume(clientX) });
    };
  };

  const power = () => dispatch({ type: POWER });

  const mute = () => dispatch({ type: MUTE });

  const play = (rawKey, valid) => {
    const key = valid ? rawKey : rawKey.key.toUpperCase();
    const keyExists = keys.includes(key);
    if (keyExists) {
      dispatch({ type: PLAY, key });

      const audio = document.getElementById(key);
      audio.currentTime = 0;
      audio.volume = volume;
      audio.muted = muted;
      audio.play();
    }
  };

  const hideScreen = on ? {} : { visibility: "hidden" };
  const powerStyle = on ? {} : { textShadow: "none", color: "grey", visibility: "visible" };

  const volumeIcon = () => {
    if (muted) return "fas fa-volume-mute";

    if (volume === 0) return "fas fa-volume-off";

    if (volume > 0.6) return "fas fa-volume-up";

    return "fas fa-volume-down";
  };

  const playingStyle = (thisKey) =>
    thisKey === key ? { textShadow: "1.5px 1.5px 1px grey" } : {};

  const ending = (thisKey) => {
    if (thisKey === key) dispatch({ type: ENDED });
  };

  return {
    playingStyle,
    ending,
    power,
    volumeFunc,
    play,
    mute,
    volumeIcon,
    powerStyle,
    volume,
    muted,
    hideScreen,
    currentInstument,
    barPosition,
    volumeWidth,
  };
};

export default useData;
