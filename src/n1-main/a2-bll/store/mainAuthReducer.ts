import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { authAPI, NewUserType, userType } from "../../a3-dal/mainAPI"
import { switchLoadingState } from "./appReducer"

type AuthInitStateType = {
    isLogged: boolean
    user: userType
    isRegister: boolean
    commonError: string
    isUpdatedPassword: boolean
    fogot: boolean
    updatedUser: NewUserType
}
const authInitialState: AuthInitStateType = {
    isLogged: false,
    user: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
    },
    isRegister: false,
    commonError: "",
    isUpdatedPassword: false,
    fogot: false,
    updatedUser: {
        name: "",
        avatar: "",
    },
}

export const signUp = createAsyncThunk(
    "auth/signUp",
    async (registsData: { email: string; password: string }, thunkAPI) => {
        try {
            const res = await authAPI.signUp(registsData)
            if (res.data.addedUser) {
                thunkAPI.dispatch(switchIsRegister({ newValueIsRegister: true }))
            } else {
                thunkAPI.dispatch(setCommonRegister({ error: res.data.error }))
            }
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            thunkAPI.dispatch(setCommonRegister(error))
        }
    }
)
export const login = createAsyncThunk(
    "auth/login",
    async (loginData: { email: string; password: string; rememberMe: boolean }, thunAPI) => {
        thunAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            await authAPI.login(loginData.email, loginData.password, loginData.rememberMe)
            thunAPI.dispatch(logIn({ value: true }))
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            thunAPI.dispatch(setCommonRegister({ error: error }))
        }
        thunAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
    }
)
export const logout = createAsyncThunk("auth/logout", async (logoutData, thunAPI) => {
    thunAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
    try {
        const res = await authAPI.logout()
        if (res.data.info) {
            thunAPI.dispatch(logIn({ value: false }))
        }
    } catch (e) {
        const error = e.res ? e.res.data.error : e.message + ", more details in the console"
        console.log("Error:", { ...e })
        thunAPI.dispatch(setCommonRegister({ error: error }))
    }
    thunAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
})
export const getUser = createAsyncThunk("auth/getUser", async (getUserData, thunAPI) => {
    const res = await authAPI.getProfile()
    let { _id, email, name, avatar } = res.data
    thunAPI.dispatch(setUser({ user: { _id, email, name, avatar } }))
})

const slice = createSlice({
    name: "auth",
    initialState: authInitialState,
    reducers: {
        switchIsRegister(state, action: PayloadAction<{ newValueIsRegister: boolean }>) {
            state.isRegister = action.payload.newValueIsRegister
        },
        setCommonRegister(state, action: PayloadAction<{ error: any }>) {
            state.commonError = action.payload.error
        },
        logIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLogged = action.payload.value
        },
        setUser(
            state,
            action: PayloadAction<{
                user: { _id: string; email: string; name: string; avatar: string }
            }>
        ) {
            state.user = action.payload.user
        },
        setUpdateUser(state, action: PayloadAction<{ data: NewUserType }>) {
            state.updatedUser = action.payload.data
        },
        setNewPassword(state, action: PayloadAction<{ isUpPassword: boolean }>) {
            state.isUpdatedPassword = action.payload.isUpPassword
        },
        switchFogot(state, action: PayloadAction<{ newFogot: boolean }>) {
            state.fogot = action.payload.newFogot
        },
    },
})

export const authReducer = slice.reducer
export const {
    switchIsRegister,
    setCommonRegister,
    logIn,
    setUser,
    setUpdateUser,
    setNewPassword,
    switchFogot,
} = slice.actions

//Thunk

export const UpdateUserInfo = (data: NewUserType) => (dispatch: Dispatch) => {
    dispatch(switchLoadingState({ valueInLoading: "loading" }))
    authAPI
        .updateUser(data)
        .then((res) => {
            dispatch(setUpdateUser({ data: data }))
        })
        .finally(() => {
            console.log("check profile")
            dispatch(switchLoadingState({ valueInLoading: "successed" }))
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister({ error: error }))
        })
}
export const forgot = (email: string, message: string) => (dispatch: Dispatch) => {
    dispatch(switchLoadingState({ valueInLoading: "loading" }))
    authAPI
        .forgot(email, message)
        .then((res) => {
            if (!res.data.error) {
                dispatch(switchFogot({ newFogot: true }))
            } else {
                dispatch(setCommonRegister({ error: res.data.error }))
            }
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister({ error: error }))
        })
        .finally(() => {
            dispatch(switchLoadingState({ valueInLoading: "successed" }))
        })
}
export const SetNewPassword =
    (newPassword: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
        dispatch(switchLoadingState({ valueInLoading: "loading" }))
        authAPI
            .setNewPassword(newPassword, resetPasswordToken)
            .then((res) => {
                if (!res.data.error) {
                    dispatch(setNewPassword({ isUpPassword: true }))
                } else {
                    dispatch(setCommonRegister({ error: res.data.error }))
                }
            })
            .catch((e) => {
                const error = e.res ? e.res.data.error : e.message + ", more details in the console"
                console.log("Error:", { ...e })
                dispatch(setCommonRegister({ error: error }))
            })
            .finally(() => {
                dispatch(switchLoadingState({ valueInLoading: "successed" }))
            })
    }
