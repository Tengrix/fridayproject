import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:7542/2.0/',
    withCredentials: true
})

export const authAPI = {
    login(email:string, password:string,rememberMe:boolean){
        return instance.post<ResponseType<{body:loginResponseType}>>('auth/login',{email,password,rememberMe})
    },
    getProfile(){
        return instance.post<userType>('auth/me')
    },
    signUp(data: signUpDataType) {
        return instance.post<signUpResponseType>("auth/register", data)
    },
    logout() {
        return instance.delete<logoutResponseType>("auth/me")
    },
    updateUser(data:userType){
        return instance.put<updatedUserResponseType>('auth/me',{data})
    }
}

export type NewUserType = {
    name:string;
    avatar:string;
}
type updatedUserResponseType = {
    updatedUser:{}
    error?:string;
}
type logoutResponseType = {
    info: string
    error: string
}

type signUpResponseType = {
    addedUser: {}
    error?: string
}
type signUpDataType = {
    email: string
    password: string
}

export type LoginType={
    email:string;
    password:string;
    rememberMe?:boolean;
}
export type SignInType<T={}> = {
    data:signUpDataType
    rememberMe:boolean
}
export type userType = {
    id: string,
    email: string,
    name: string,
    avatar?: string

}
export type ResponseType<T={}> = {
    error?:string;
    body:loginResponseType
}
type loginResponseType = {
    data:userType
    created: any;
    updated:any;
    isAdmin:boolean;
    verified:boolean;
    rememberMe:boolean;
}
