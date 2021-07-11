import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "../../a3-dal/mainAPI"
import { logIn, setUser } from "./mainAuthReducer"

type LoadingProgressType = "loading" | "successed"
type AppReducerStateType = {
    isInitialized: boolean
    loadingProgress: LoadingProgressType
}
const appReducerState: AppReducerStateType = {
    isInitialized: false,
    loadingProgress: "successed",
}

export const isInitializedTC = createAsyncThunk("app/isInitialized", async (param, thunkAPI) => {
    //thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
    try {
        const user = await (await authAPI.getProfile()).data
        thunkAPI.dispatch(logIn({ value: true }))
        thunkAPI.dispatch(setUser({ user }))
        //thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
        return { stateInitialized: true }
    } catch {}
})

const slice = createSlice({
    name: "app",
    initialState: appReducerState,
    reducers: {
        switchLoadingState(state, action: PayloadAction<{ valueInLoading: LoadingProgressType }>) {
            state.loadingProgress = action.payload.valueInLoading
        },
    },
    extraReducers: (builder) => {
        builder.addCase(isInitializedTC.fulfilled, (state, action) => {
            if (action.payload?.stateInitialized) {
                state.isInitialized = action.payload?.stateInitialized
            }
        })
    },
})

export const appReducer = slice.reducer
export const { switchLoadingState } = slice.actions
