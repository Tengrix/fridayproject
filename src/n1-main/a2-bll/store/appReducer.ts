import { FormatColorResetRounded } from "@material-ui/icons"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "../../a3-dal/mainAPI"
import { getPackCards } from "./cardPacksReducer"
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
    thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
    try {
        const res = await authAPI.getProfile()
        if (!res.data.error) {
            const user = res.data
            await thunkAPI.dispatch(getPackCards())
            thunkAPI.dispatch(logIn({ value: true }))
            thunkAPI.dispatch(setUser({ user }))
        } else {
            thunkAPI.dispatch(logIn({ value: false }))
        }
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
    } catch {}
    return { stateInitialized: true }
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
