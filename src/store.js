import { configureStore, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rerducers';
export default () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};
