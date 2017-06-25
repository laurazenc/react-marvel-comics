import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const storeWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = storeWithMiddleware(reducers);
