import { combineReducers } from 'redux';

import charactersReducer from './characters-reducer';

const rootReducer = combineReducers({
  character: charactersReducer
});

export default rootReducer;
