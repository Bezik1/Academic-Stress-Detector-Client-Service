import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { LoadingState } from "../../types/store/LoadingState"


const initialState: LoadingState = {
    loading: false,
    message: null
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{ loading: boolean, message: string| null }>) =>{
            state.loading = action.payload.loading
            state.message = action.payload.message
        }
    }
})

export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer