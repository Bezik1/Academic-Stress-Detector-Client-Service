import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Token } from "../../types/store/Token"

const initialState: Token = {
    value: null,
}

const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) =>{
            state.value = action.payload
        }
    }
})

export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer