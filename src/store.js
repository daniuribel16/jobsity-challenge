import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const inicialState = {}
const middelware = [thunk];

const store = createStore(
  rootReducer,
  inicialState,
  applyMiddleware(...middelware)
);

export default store;