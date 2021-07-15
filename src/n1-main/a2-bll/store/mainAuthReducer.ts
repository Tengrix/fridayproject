import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Dispatch } from "redux"
import { authAPI, NewUserType, userType } from "../../a3-dal/mainAPI"
//
//
type ActionType =
    | LogInACType
    | setUserType
    | switchIsAuthType
    | setErrorRegisterType
    | updatedUserType
    | setNewPasswordType
    | isInitializedType
    | switchFogotType
//
//
type switchIsAuthType = ReturnType<typeof switchIsRegister>
type setErrorRegisterType = ReturnType<typeof setCommonRegister>
type LogInACType = ReturnType<typeof logIn>
type setUserType = ReturnType<typeof setUser>
type updatedUserType = ReturnType<typeof setUpdateUser>
type setNewPasswordType = ReturnType<typeof setNewPassword>
type isInitializedType = ReturnType<typeof isInitialized>
type switchFogotType = ReturnType<typeof switchFogot>
//
//
type initStateType = {
    isLogged: boolean
    user: userType
    isRegister: boolean
    commonError: string
    isUpdatedPassword: boolean
    fogot: boolean
    isInitialized: boolean
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
    isInitialized: false,
    updatedUser: {
        name: "",
        avatar: "",
    },
}

const slice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        switchIsRegister(state, action:PayloadAction<{newValueIsRegister:boolean}>){
            state.isRegister = action.payload.newValueIsRegister;
        },
        setCommonRegister(state, action:PayloadAction<{error:any}>){
            state.commonError = action.payload.error
        },
        logIn(state,action:PayloadAction<{value:boolean}>){
            state.isLogged = action.payload.value
        },
        setUser(state, action:PayloadAction<{user:{_id: string, email: string, name: string, avatar: string}}>){
            state.user = action.payload.user
        },
        setUpdateUser(state,action:PayloadAction<{data:NewUserType}>){
            state.updatedUser = action.payload.data
        },
        setNewPassword(state,action:PayloadAction<{isUpPassword: boolean}>){
            state.isUpdatedPassword = action.payload.isUpPassword
        },
        isInitialized(state,action:PayloadAction<{value:boolean}>){
            state.isInitialized = action.payload.value
        },
        switchFogot(state,action:PayloadAction<{newFogot: boolean}>){
            state.fogot = action.payload.newFogot
        }
    }
})

export const authReducer = slice.reducer
export const {switchIsRegister,setCommonRegister,logIn,setUser,setUpdateUser,setNewPassword,isInitialized,switchFogot} = slice.actions

//Thunk
export const signUpTC = (email: string, password: string) => {
    const signUpData = { email, password }
    return (dispatch: Dispatch<ActionType>) => {
        authAPI
            .signUp(signUpData)
            .then((resp) => {
                if (resp.data.addedUser) {
                    dispatch(switchIsRegister({newValueIsRegister:true}))
                } else {
                    dispatch(setCommonRegister({error:resp.data.error}))
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
    (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionType>) => {
        authAPI
            .login(email, password, rememberMe)
            .then((res) => {
                dispatch(logIn({value:true}))
            })
            .catch((e) => {
                const error = e.res ? e.res.data.error : e.message + ", more details in the console"
                console.log("Error:", { ...e })
                dispatch(setCommonRegister({error:error}))
            })
            .finally(() => {})
    }
export const LogoutTC = () => (dispatch: Dispatch) => {
    authAPI
        .logout()
        .then((res) => {
            if (res.data.info) {
                dispatch(logIn({value:false}))
            }
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister({error:error}))
        })
}
export const GetUserTC = () => (dispatch: Dispatch<setUserType>) => {
    authAPI.getProfile().then((res) => {
        let { _id, email, name, avatar } = res.data
        dispatch(setUser({user:{_id, email, name, avatar}}))
    })
}
export const UpdateUserInfo = (data: NewUserType) => (dispatch: Dispatch) => {
    authAPI
        .updateUser(data)
        .then((res) => {
            dispatch(setUpdateUser({data:data}))
        })
        .finally(() => {
            console.log("check profile")
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister({error:error}))
        })
}
export const isInitializedTC = () => (dispatch: Dispatch) => {
    authAPI
        .getProfile()
        .then((res) => {
            dispatch(logIn({value:true}))
        })
        .catch(() => {})
        .finally(() => {
            dispatch(isInitialized({value:true}))
        })
}
export const forgot = (email: string, message: string) => (dispatch: Dispatch) => {
    authAPI
        .forgot(email, message)
        .then((res) => {
            if (!res.data.error) {
                dispatch(switchFogot({newFogot:true}))
            } else {
                dispatch(setCommonRegister({error:res.data.error}))
            }
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister({error:error}))
        })
}
export const SetNewPassword =
    (newPassword: string, resetPasswordToken: string) => (dispatch: Dispatch) => {
        authAPI
            .setNewPassword(newPassword, resetPasswordToken)
            .then((res) => {
                if (!res.data.error) {
                    dispatch(setNewPassword({isUpPassword:true}))
                } else {
                    dispatch(setCommonRegister({error:res.data.error}))
                }
            })
            .catch((e) => {
                const error = e.res ? e.res.data.error : e.message + ", more details in the console"
                console.log("Error:", { ...e })
                dispatch(setCommonRegister({error:error}))
            })
    }
