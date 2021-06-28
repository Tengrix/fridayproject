import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0",
    headers: {},
})

type logoutResponceType = {
    info: string
    error: string
}


export const logoutApi = {
    logout() {
        const promise = instance.delete<logoutResponceType>("/auth/me")
        return promise
    },
}
