import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ErrorState } from "../../types/store/ErrorState"

const initialState: ErrorState = {
    error: null
}

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<{ status: string, message: string }>) =>{
            state.error = action.payload
        }
    }
})

export const { setError } = errorSlice.actions

export default errorSlice.reducer