import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducer/index'
const initState = {};
const store = createStore(rootReducer, initState);
export default store;
