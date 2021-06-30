import { Dispatch } from "redux"
import { authAPI, userType } from "../../a3-dal/mainAPI"
//
//
type ActionType =
    | LogInACType
    | setUserType
    | switchIsAuthType
    | setErrorRegisterType
    | updatedUserType
    | setNewPasswordType
//
//
type switchIsAuthType = ReturnType<typeof switchIsRegister>
type setErrorRegisterType = ReturnType<typeof setCommonRegister>
type LogInACType = ReturnType<typeof logIn>
type setUserType = ReturnType<typeof setUser>
type updatedUserType = ReturnType<typeof setUpdateUser>
type setNewPasswordType = ReturnType<typeof setNewPassword>
type initStateType = {
    isLogged: boolean
    user: userType
    isRegister: boolean
    commonError: string
    isUpdatedPassword: boolean
}
//
//
let initState: initStateType = {
    isLogged: false,
    user: {
        id: "",
        email: "qwe",
        name: "ewq",
        avatar: "weq",
    },
    isRegister: false,
    commonError: "",
    isUpdatedPassword: false,
}
//
//
export const authReducer = (
    state: initStateType = initState,
    action: ActionType
): initStateType => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isLogged: action.value }
        case SET_USER:
            return { ...state, user: action.user }
        case SWITCH_IS_REGISTR:
            return { ...state, isRegister: action.newValueIsRegister }
        case SET_ERROR_REGISTR:
            return { ...state, commonError: action.error }
        case SET_UPDATE_USER:
            return { ...state, user: action.data }
        case SET_NEW_PASSWORD:
            return { ...state, isUpdatedPassword: action.isUpPassword }
        default: {
            return state
        }
    }
}
//
//
const SWITCH_IS_REGISTR = "AUTH/SWITCH-IS-REGISTR"
const SET_ERROR_REGISTR = "AUTH/SET-ERROR-REGISTR"
const SET_USER = "AUTH/SET-USER"
const SIGN_IN = "AUTH/SIGN-IN"
const SET_UPDATE_USER = "AUTH/SET-UPDATE-USER"
const SET_NEW_PASSWORD = "AUTH/SET-NEW-PASSWORD"
//
//
export const switchIsRegister = (newValueIsRegister: boolean) => {
    return { type: SWITCH_IS_REGISTR, newValueIsRegister } as const
}
export const setCommonRegister = (error: any) => ({ type: SET_ERROR_REGISTR, error } as const)

export const logIn = (value: boolean) => {
    return {
        type: SIGN_IN,
        value,
    } as const
}
export const setUser = (id: string, email: string, name: string, avatar?: string) => {
    return {
        type: SET_USER,
        user: { id, email, name, avatar },
    } as const
}
export const setUpdateUser = (data: userType) => {
    return {
        type: SET_UPDATE_USER,
        data,
    } as const
}
export const setNewPassword = (isUpPassword: boolean) =>
    ({
        type: SET_NEW_PASSWORD,
        isUpPassword,
    } as const)
//
//
export const signUpTC = (email: string, password: string) => {
    const signUpData = { email, password }
    return (dispatch: Dispatch<ActionType>) => {
        authAPI
            .signUp(signUpData)
            .then((resp) => {
                if (resp.data.addedUser) {
                    dispatch(switchIsRegister(true))
                } else {
                    dispatch(setCommonRegister(resp.data.error))
                }
            })
            .catch((error) => {
                dispatch(setCommonRegister("Common error"))
            })
    }
}

export const LoginTC =
    (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionType>) => {
        authAPI
            .login(email, password, rememberMe)
            .then((res) => {
                dispatch(logIn(true))
            })
            .catch((e) => {
                const error = e.res ? e.res.data.error : e.message + ", more details in the console"
                console.log("Error:", { ...e })
            })
            .finally(() => {})
    }
export const LogoutTC = () => (dispatch: Dispatch) => {
    authAPI
        .logout()
        .then((res) => {
            if (res.data.info) {
                dispatch(logIn(false))
            }
        })
        .catch(() => {})
}
export const GetUserTC = () => (dispatch: Dispatch<setUserType>) => {
    authAPI.getProfile().then((res) => {
        let { id, email, name, avatar } = res.data
        dispatch(setUser(id, email, name, avatar))
    })
}
export const UpdateUserInfo = (data: userType) => (dispatch: Dispatch) => {
    authAPI.updateUser(data).then((res) => {
        dispatch(setUpdateUser(data))
    })
}
export const SetNewPassword =
    (newPassword: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
        authAPI.setNewPassword(newPassword, resetPasswordToken).then((res) => {
            if (res.data.error.length === 0) {
                dispatch(setNewPassword(true))
            } else {
                dispatch(setCommonRegister(res.data.error))
            }
        })
    }
