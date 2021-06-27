import {Dispatch} from "redux";
import {authAPI} from "../../a3-dal/login-api";
type ActionType = LogInACType
type LogInACType = {
    type:'login',
    value: boolean
}

type initStateType = {
    isLogged:boolean
    email:string,
    password:string,
    rememberMe: boolean
}
let initState:initStateType = {
    isLogged:false,
    email:'',
    password:'',
    rememberMe: false
}

export const loginReducer= (state:initStateType = initState,action:ActionType):initStateType => {
    switch (action.type){
        case'login':{
            return {...state,isLogged:action.value}
        }
        default:{
            return state
        }
    }
}
export const logInAC = (value:boolean) => {
    return{
        type:'login',
        value
    }
}

export const LoginTC = (email:string, password:string,rememberMe:boolean) => (dispatch:Dispatch) => {
    authAPI.login(email,password,rememberMe).then((res)=>{
            dispatch(logInAC(true))
    })
        .catch(()=>{

        })
        .finally(()=>{

        })
}