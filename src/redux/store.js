import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {ProjectReducer} from './reducers/ProjectReducer';
const middleware = applyMiddleware(thunk, logger);

const rootReducer = combineReducers({ProjectReducer});
export const store = createStore(rootReducer,middleware);
