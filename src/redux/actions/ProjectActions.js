import {
    FETCH_PROJECTS_BEGIN,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILED,
  } from "../constants/ProjectConstants";
import axios from "axios";
import {Config} from "../../config"

export const getProjects = (dispatch) => {
    dispatch(beginFetchingProjects());
    axios.get(Config.url+"projects/get").then(res=>{
        if(res&&res.data){
            dispatch(successFetchingProjects(res.data));
        }else{
            dispatch(failedFetchingProjects())
        }
    }).catch(e=>dispatch(failedFetchingProjects()))
}

export const beginFetchingProjects = () => ({
    type:FETCH_PROJECTS_BEGIN
})

export const successFetchingProjects = (projects) => ({
    type:FETCH_PROJECTS_SUCCESS,
    payload:projects
})

export const failedFetchingProjects = () => ({
    type:FETCH_PROJECTS_FAILED
})