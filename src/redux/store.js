import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./slice/auth-slice";
import taskReducer from "./slice/task-slice";

const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;
