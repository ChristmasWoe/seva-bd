import {
  FETCH_PROJECTS_BEGIN,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
} from "../constants/ProjectConstants";

const initialState = {
  projects: [],
  projectsFetching: false,
};

export const ProjectReducer = (state = initialState, action = {}) => {
  console.log("red",action,state)
  switch (action.type) {
    case FETCH_PROJECTS_BEGIN:
      return {  ...state, projectsFetching: true };
    case FETCH_PROJECTS_SUCCESS:
      return { ...state,projectsFetching: false, projects:action.payload };
    case FETCH_PROJECTS_FAILED:
      return { ...state,projectsFetching: false };
    default:
      return state;
  }
};
