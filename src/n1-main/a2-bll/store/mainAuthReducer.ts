import {Dispatch} from "redux";
import {authAPI, NewUserType, userType} from "../../a3-dal/mainAPI";

type ActionType = LogInACType|setUserType|switchIsAuthType|setErrorRegisterType|updatedUserType
type switchIsAuthType = ReturnType<typeof switchIsRegister>
type setErrorRegisterType = ReturnType<typeof setErrorRegister>
type LogInACType = ReturnType<typeof logIn>
type setUserType = ReturnType<typeof setUser>
type updatedUserType = ReturnType<typeof setUpdateUser>
type initStateType = {
    isLogged:boolean
    user:userType
    isRegister:boolean
    registerError:string
}
let initState:initStateType = {
    isLogged:false,
    user:{
        id:'',
        email:'qwe',
        name:'ewq',
        avatar:'weq'
    },
    isRegister: false,
    registerError: "",
}
const SWITCH_IS_REGISTR = "SIGN-UP/SWITCH-IS-REGISTR"
const SET_ERROR_REGISTR = "SIGN-UP/SET-ERROR-REGISTR"
const SET_USER = 'SET-USER'
const SIGN_IN = 'SIGN-IN'
const SET_UPDATE_USER = 'SET-UPDATE-USER'
export const authReducer= (state:initStateType = initState,action:ActionType):initStateType => {
    switch (action.type){
        case SIGN_IN:
            return {...state,isLogged:action.value}
        case SET_USER:
            return {...state,user:action.user}
        case SWITCH_IS_REGISTR:
            return { ...state, isRegister: action.newValueIsRegister }
        case SET_ERROR_REGISTR:
            return { ...state, registerError: action.error }
        case SET_UPDATE_USER:
            return {...state, user:action.data}
        default:{
            return state
        }
    }
}
export const switchIsRegister = (newValueIsRegister: boolean) => {
    return { type: SWITCH_IS_REGISTR, newValueIsRegister } as const
}
export const setErrorRegister = (error: any) => ({ type: SET_ERROR_REGISTR, error } as const)

export const logIn = (value:boolean) => {
    return{
        type:SIGN_IN,
        value
    }as const
}
export const setUser = (id:string, email:string, name:string, avatar?:string)=> {
    return{
        type:SET_USER,
        user:{id,email,name,avatar}
    } as const
}
export const setUpdateUser = (data:userType) => {
    return{
        type:SET_UPDATE_USER,
        data
    } as const
}


export const signUpTC = (email: string, password: string) => {
    const signUpData = { email, password }
    return (dispatch: Dispatch<ActionType>) => {
        authAPI
            .signUp(signUpData)
            .then((resp) => {
                if (resp.data.addedUser) {
                    dispatch(switchIsRegister(true))
                } else {
                    dispatch(setErrorRegister(resp.data.error))
                }
            })
            .catch((error) => {
                dispatch(setErrorRegister("Common error"))
            })
    }
}

export const LoginTC = (email:string, password:string,rememberMe:boolean) => (dispatch:Dispatch<ActionType>) => {
    authAPI.login(email,password,rememberMe).then((res)=>{
            dispatch(logIn(true))
    })
        .catch((e)=>{
            const error=e.res? e.res.data.error:
                (e.message+', more details in the console')
            console.log('Error:', {...e})
        })
        .finally(()=>{

        })
}
export const LogoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(res => {
            if (res.data.info) {
                dispatch(logIn(false))
            }
        }).catch(()=>{
    })
}
export const GetUserTC = () =>(dispatch:Dispatch<setUserType>)=> {
    authAPI.getProfile().then((res)=>{
        let{id,email,name,avatar} = res.data
        dispatch(setUser(id,email,name,avatar))
    })
}
export const UpdateUserInfo = (data:userType) => (dispatch:Dispatch) => {
    authAPI.updateUser(data).then((res)=>{
        dispatch(setUpdateUser(data))
    })
}
