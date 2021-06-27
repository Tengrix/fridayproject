import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0",
    headers: {},
})

type signUpResponceType = {
    addedUser: {}
    error?: string
}
type signUpDataType = {
    email: string
    password: string
}

export const signUpAPI = {
    signUp(data: signUpDataType) {
        return instance.post<signUpResponceType>("/auth/register", data)
    },
}
