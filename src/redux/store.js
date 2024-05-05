import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./slice/auth-slice";
import assignmentReducer from "./slice/assignment-slice";
import submissionReducer from "./slice/submission-slice";

//when you use useSelector in component, so you can get these reducers with same name
const rootReducer = combineReducers({
    auth: authReducer,
    assignment: assignmentReducer,
    submission: submissionReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;
