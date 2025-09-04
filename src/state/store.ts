import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./token/tokenSlice"
import userReducer from "./user/userSlice"
import sessionsReducer from "./sessions/sessionsSlice"

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
        sessions: sessionsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch