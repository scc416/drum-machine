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
      return { state, muted: !state.muted};
    },
  };

  const reducer = (state, action) => {
    return reducers[action.type](state, action) || state;
  };

  const [state, dispatch] = useReducer(reducer, {
    key: null,
    class: false,
    on: true,
    volume: 0.61,
    volumeChanging: false,
    muted: false,
  });

  return {};
};

export default useData;
