import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../../types/User"
import type { UserState } from "../../types/store/UserState"
import { ME_URL } from '../../const/api';

const initialState: UserState = {
    user: null,
    error: null,
    isLoading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(getUser.pending, state =>{
                state.error = null
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) =>{
                state.user = action.payload
                state.isLoading = false
            })
            .addCase(getUser.rejected, (state, action) => {
                    state.error = action.error.message ?? "Failed to fetch user";
                    state.isLoading = false;
                });
        },
})

export const getUser = createAsyncThunk<User, { token: string }>(
    "user/getUser",
    async ({ token }) => {
        try {
            const res = await fetch(ME_URL, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data: User = await res.json();
            return data;
        } catch (err) {
            throw err;
        }
    }   
);

export default userSlice.reducer