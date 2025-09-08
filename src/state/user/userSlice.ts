import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../../types/User"
import type { UserState } from "../../types/store/UserState"
import { ME_URL } from '../../const/api';

const initialState: UserState = {
    user: null,
    error: null,
    isLoading: false,
}

export const getUser = createAsyncThunk<
    User,
    { token: string },
    { rejectValue: { status: string; message: string } }
>(
    "user/getUser",
    async ({ token }, thunkAPI) => {
        try {            
            const res = await fetch(ME_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            console.log(res)

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                return thunkAPI.rejectWithValue({
                    status: res.status.toString(),
                    message: data?.message || res.statusText || "Failed to fetch user",
                });
            }

            const data: User = await res.json();
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue({
                status: "400",
                message: err instanceof Error ? err.message : String(err),
            });
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            localStorage.clear();
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUser.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.error = action.payload ?? { status: "400", message: "Failed to fetch user" };
                state.isLoading = false;
            });
    },
});

export const { logout: userLogout } = userSlice.actions;
export default userSlice.reducer;