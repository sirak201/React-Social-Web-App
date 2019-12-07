import {
  SET_SCREAMS,
  LOADING_UI,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_ERRORS
} from "../types";
import axios from "axios";

export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get("/screams")
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: []
      });
    });
};
