import { combineReducers } from 'redux';

import charactersReducer from './characters-reducer';

import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  character: charactersReducer
});

export default rootReducer;
