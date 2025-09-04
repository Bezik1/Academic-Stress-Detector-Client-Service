import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SessionsState } from "../../types/store/SessionsState"
import type { User } from "../../types/User"
import { USER_SESSIONS_URL } from "../../const/api"
import type { Session } from "../../types/Session"

const initialState: SessionsState = {
    sessions: [],
    error: null,
    isLoading: false,
}

const sessionsSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(getUserSessions.pending, state =>{
                state.isLoading = true
                state.error = null
            })
            .addCase(getUserSessions.fulfilled, (state, action: PayloadAction<Session[]>) =>{
                state.sessions = action.payload
                state.isLoading = false
            })
            .addCase(getUserSessions.rejected, (state, action) =>{
                state.error = action.error.message ?? "Failed to fetch user sessions"
                state.isLoading = false
            })
    },
})

export const getUserSessions = createAsyncThunk<Session[], { token: string, user: User }>(
    "sessions/getUserSessions",
    async ({ token, user }) =>{
        try {
            const res = await fetch(`${USER_SESSIONS_URL}/${user.id}`, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data: Session[] = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }
)

export default sessionsSlice.reducer