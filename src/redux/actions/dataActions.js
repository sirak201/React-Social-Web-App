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

export const likeScream = screamID => dispatch => {
  axios
    .get(`/scream/${screamID}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const unlikeScream = screamID => dispatch => {
  axios
    .get(`/scream/${screamID}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
