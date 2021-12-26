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
};

export default useData;
