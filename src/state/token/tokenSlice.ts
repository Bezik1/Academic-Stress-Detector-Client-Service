import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TokenState } from "../../types/store/TokenState"
import { LOGIN_URL } from "../../const/api";

const initialState: TokenState = {
    token: null,
    error: null,
    isLoading: false
}

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(getToken.pending, state =>{
                state.error = null
                state.isLoading = true
            })
            .addCase(getToken.fulfilled, (state, action: PayloadAction<string>) =>{
                state.token = action.payload
                state.isLoading = false
            })
            .addCase(getToken.rejected, (state, action) =>{
                state.error = {
                    status: action.error.code ?? "400",
                    message: action.error.message ?? "Login failed"
                }
            })
    }
})

export const getToken = createAsyncThunk<string, { email: string, password: string }>(
    "token/getToken",
    async ({ email, password }) => {
            try {
                const res = await fetch(LOGIN_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const generatedToken = await res.text()
                return generatedToken
            } catch(err) {
                throw err;
            }
    }   
);

export default tokenSlice.reducer