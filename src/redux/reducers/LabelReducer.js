import {
    FETCH_LABELS_BEGIN,
    FETCH_LABELS_SUCCESS,
    FETCH_LABELS_FAILED,
  } from "../constants/LabelConstants";
  
  const initialState = {
    labels: [],
    labelsFetching: false,
  };
  
  export const LabelsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
      case FETCH_LABELS_BEGIN:
        return {  ...state, labelsFetching: true };
      case FETCH_LABELS_SUCCESS:
        console.log("state",state)
        return { ...state,labelsFetching: false, labels:action.payload };
      case FETCH_LABELS_FAILED:
        return { ...state,labelsFetching: false };
      default:
        return state;
    }
  };
  