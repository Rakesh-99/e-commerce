import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userAuthSlice from '../feature/auth/userAuthSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import cartSlice from '../feature/cart/CartSlice';




// Persist config : 
const persistConfig = {
    version: 1,
    key: "root",
    storage,
};

// Root reducer : 
const rootReducer = combineReducers({
    userauth: userAuthSlice,
    cartslice: cartSlice
});


// Persisted reducer : 
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export const persistor = persistStore(store)


export default store;

