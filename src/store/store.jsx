import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './combineReducer.js'

const persistConfig = {key: 'root' , storage}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);