import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {ProjectReducer} from './reducers/ProjectReducer';
import {LabelsReducer} from "./reducers/LabelReducer"
const middleware = applyMiddleware(thunk, logger);

const rootReducer = combineReducers({ProjectReducer,LabelsReducer});
export const store = createStore(rootReducer,middleware);
