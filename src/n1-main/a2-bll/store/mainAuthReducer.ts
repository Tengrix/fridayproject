import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { authAPI, NewUserType, userType } from "../../a3-dal/mainAPI"
import { switchLoadingState, SwitchLoadingStateType } from "./appReducer"


type initStateType = {
    isLogged: boolean
    user: userType
    isRegister: boolean
    commonError: string
    isUpdatedPassword: boolean
    fogot: boolean
    updatedUser: NewUserType
}
//
//
let initState: initStateType = {
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

const slice = createSlice({
    name: "auth",
    initialState: initState,
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
            debugger
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
export const signUpTC = (email: string, password: string) => {
    const signUpData = { email, password }
    return (dispatch: Dispatch) => {
        authAPI
            .signUp(signUpData)
            .then((resp) => {
                if (resp.data.addedUser) {
                    dispatch(switchIsRegister({ newValueIsRegister: true }))
                } else {
                    dispatch(setCommonRegister({ error: resp.data.error }))
                }
            })
            .catch((e) => {
                const error = e.res ? e.res.data.error : e.message + ", more details in the console"
                console.log("Error:", { ...e })
                dispatch(setCommonRegister(error))
            })
    }
}
export const LoginTC =
    (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {
        dispatch(switchLoadingState({ valueInLoading: "loading" }))
        authAPI
            .login(email, password, rememberMe)
            .then((res) => {
                dispatch(logIn({ value: true }))
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
export const LogoutTC = () => (dispatch: Dispatch) => {
    dispatch(switchLoadingState({ valueInLoading: "loading" }))
    authAPI
        .logout()
        .then((res) => {
            if (res.data.info) {
                dispatch(logIn({ value: false }))
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
export const GetUserTC = () => (dispatch: Dispatch) => {
    authAPI.getProfile().then((res) => {
        let { _id, email, name, avatar } = res.data
        dispatch(setUser({ user: { _id, email, name, avatar } }))
    })
}
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
