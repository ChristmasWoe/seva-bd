import {
    FETCH_LABELS_BEGIN,
    FETCH_LABELS_SUCCESS,
    FETCH_LABELS_FAILED,
  } from "../constants/LabelConstants";
import axios from "axios";
import {Config} from "../../config"

export const getLabels= (dispatch) => {
    dispatch(beginFetchingLabels());
    axios.get(Config.url+"labels/get").then(res=>{
        if(res&&res.data){
            dispatch(successFetchingLabels(res.data));
        }else{
            dispatch(failedFetchingLabels())
        }
    }).catch(e=>dispatch(failedFetchingLabels()))
}

export const beginFetchingLabels = () => ({
    type:FETCH_LABELS_BEGIN
})

export const successFetchingLabels = (labels) => ({
    type:FETCH_LABELS_SUCCESS,
    payload:labels
})

export const failedFetchingLabels = () => ({
    type:FETCH_LABELS_FAILED
})