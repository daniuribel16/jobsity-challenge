import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const inicialState = {}
const middelware = [thunk];

const store = createStore(
  rootReducer,
  inicialState,
  compose(applyMiddleware(...middelware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;