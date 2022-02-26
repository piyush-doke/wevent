import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './reducers';
const persistConfig = {
    key: 'root',
    storage,
  }
   
const persistedReducer = persistReducer(persistConfig, rootReducer);

const loggerMiddleware = createLogger();
const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ))
let persistor = persistStore(store);
export {store,persistor};