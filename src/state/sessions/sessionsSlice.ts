import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { SessionsState } from "../../types/store/SessionsState"
import type { User } from "../../types/User"
import { USER_SESSIONS_URL } from "../../const/api"
import type { Session } from "../../types/Session"

const initialState: SessionsState = {
    sessions: null,
    error: null,
    isLoading: false,
}

export const getUserSessions = createAsyncThunk<
    Session[],
    { token: string; user: User },
    { rejectValue: { status: string; message: string } }
>(
    "sessions/getUserSessions",
    async ({ token, user }, thunkAPI) => {
        try {      
            const res = await fetch(`${USER_SESSIONS_URL}/${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                return thunkAPI.rejectWithValue({
                    status: res.status.toString(),
                    message: data?.message || res.statusText || "Failed to fetch user sessions",
                });
            }

            const data: Session[] = await res.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({
                status: "400",
                message: err instanceof Error ? err.message : String(err),
            });
        }
    }
);

const sessionsSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {
        logout: state => {
            state.sessions = null;
            localStorage.clear();
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUserSessions.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserSessions.fulfilled, (state, action: PayloadAction<Session[]>) => {
                state.sessions = action.payload;
                state.isLoading = false;
            })
            .addCase(getUserSessions.rejected, (state, action) => {
                state.error = action.payload ?? { status: "400", message: "Failed to fetch user sessions" };
                state.isLoading = false;
            });
    },
});

export const { logout: sessionsLogout } = sessionsSlice.actions;
export default sessionsSlice.reducer;