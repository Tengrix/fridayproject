import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0",
    headers: {},
    withCredentials:true
})

type logoutResponseType = {
    info: string
    error: string
}


export const logoutApi = {
    logout() {
        return instance.delete<logoutResponseType>("/auth/me")
    },
}
