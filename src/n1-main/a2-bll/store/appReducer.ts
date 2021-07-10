import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { authAPI } from "../../a3-dal/mainAPI"
import { logIn } from "./mainAuthReducer"

export type InitializedType = ReturnType<typeof initialized>
export type SwitchLoadingStateType = ReturnType<typeof switchLoadingState>

type LoadingProgressType = "loading" | "successed"
type AppReducerStateType = {
    isInitialized: boolean
    loadingProgress: LoadingProgressType
}
const appReducerState: AppReducerStateType = {
    isInitialized: false,
    loadingProgress: "successed",
}

const slice = createSlice({
    name: "app",
    initialState: appReducerState,
    reducers: {
        initialized(state, action: PayloadAction<{ stateInitialized: boolean }>) {
            state.isInitialized = action.payload.stateInitialized
        },
        switchLoadingState(
            state,
            action: PayloadAction<{ valueInLoading: LoadingProgressType }>
        ) {
            state.loadingProgress = action.payload.valueInLoading
        },
    },
})

export const appReducer = slice.reducer
export const {initialized, switchLoadingState} = slice.actions

////////THUNK////////

export const isInitializedTC = () => (dispatch: Dispatch) => {
    authAPI
        .getProfile()
        .then((res) => {
            dispatch(logIn({value: true}))
        })
        .catch(() => {})
        .finally(() => {
            dispatch(initialized({stateInitialized: true}))
        })
}
