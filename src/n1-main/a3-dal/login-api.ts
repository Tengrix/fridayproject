import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:7542/2.0/'
})

export const authAPI = {
    login(email:string, password:string,rememberMe:boolean){
        return instance.post<ResponseType<{body:loginResponseType}>>('auth/login',{email,password,rememberMe})
    }
}
export type LoginType={
    email:string;
    password:string;
    rememberMe?:boolean;
}
export type ResponseType<T={}> = {
    error?:string;
    body:loginResponseType
}
type loginResponseType = {
    id:string;
    email:string;
    avatar?:string;
    publicCardPacksCount:number;
    created: any;
    updated:any;
    isAdmin:boolean;
    verified:boolean;
    rememberMe:boolean;
}
