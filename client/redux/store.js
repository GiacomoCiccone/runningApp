import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {};

const middlewares = [thunk];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ['trackingSession', 'statistics', 'history']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middlewares),
  )
);

export const persistor = persistStore(store);

export default { store, persistor };