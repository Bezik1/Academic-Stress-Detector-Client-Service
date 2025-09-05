import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token/tokenSlice"
import userReducer from "./user/userSlice"
import sessionsReducer from "./sessions/sessionsSlice"
import errorReducer from "./error/errorSlice"
import loadingReducer from "./loading/loadingSlice"

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
        sessions: sessionsReducer,
        error: errorReducer,
        loading: loadingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch