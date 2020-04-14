import {createStore, combineReducers,
  applyMiddleware} from 'redux';
 import {mainReducer} from './mainApp';
 import thunkMiddleware from 'redux-thunk';
 
 
let rootReducer = combineReducers({
  mainApp: mainReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

window.__store__ = store;

export default store;