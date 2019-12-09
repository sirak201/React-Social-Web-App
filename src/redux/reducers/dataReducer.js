import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_Data,
  DELETE_SCREAM,
  POST_SCREAM
} from "../types";

const initialState = {
  screams: [],
  scream: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_Data:
      return {
        ...state,
        loading: true
      };

    case SET_SCREAMS: {
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    }

    case LIKE_SCREAM:
    case UNLIKE_SCREAM: {
      console.log();
      let index = state.screams.findIndex(scream => {
        return scream.screamId === action.payload.screamId;
      });
      console.log("here is the index", index, action.payload);
      state.screams[index] = action.payload;
      return {
        ...state
      };
    }

    case DELETE_SCREAM: {
      const index = state.screams.findIndex(scream => {
        return scream.screamId === action.payload;
      });
      state.screams.splice(index, 1);
      return {
        ...state
      };
    }

    case POST_SCREAM: {
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    }

    default:
      return state;
  }
}
