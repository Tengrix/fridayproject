import axios from "axios"

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
})

export const authAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{ body: loginResponseType }>>("auth/login", {
            email,
            password,
            rememberMe,
        })
    },
    getProfile() {
        return instance.post<userType>("auth/me")
    },
    signUp(data: signUpDataType) {
        return instance.post<signUpResponseType>("auth/register", data)
    },
    logout() {
        return instance.delete<logoutResponseType>("auth/me")
    },
    updateUser(data: NewUserType) {
        return instance.put<updatedUserResponseType>("auth/me", data)
    },
    forgot(email: string, message: string) {
        return instance.post<SendNewPassResponseType>("auth/forgot", { email, message })
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<SendNewPassResponseType>("auth/set-new-password", {
            password,
            resetPasswordToken,
        })
    },
<<<<<<< HEAD
    setCardsPack(page: number = 1, pageCount: number = 5) {
        return instance.get<ResponseCardsType>(`cards/pack?page=${page}&pageCount=${pageCount}`)
    },
    createCardsPack(name: string) {
        return instance.post<initCardsPack[]>(`cards/pack`, { cardsPack: { name: name } })
    },
    deletePack(id: string) {
        return instance.delete<ResponseCardsType>(`cards/pack/${id}`)
    },
=======
    setCardsPack() {
        return instance.get<ResponseCardsType>(`cards/pack`)
    },
    createCardsPack(name: string) {
        return instance.post<ResponseCardsType>(`cards/pack`, { cardsPack: { name: name } })
    },
    deletePack(idPack: string) {
        return instance.delete<ResponseCardsType>(`cards/pack/?id=${idPack}`)
    },
    updatePack(id: string, name: string) {
        return instance.put<ResponseCardsType>(`cards/pack`, { cardsPack: { _id: id, name: name } })
    },
>>>>>>> origin/master
}

export type createCardsPackType = {
    name: string
    private: boolean
}
export type initCardsPack = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created?: string
    updated?: string
}
export type ResponseCardsType = {
<<<<<<< HEAD
    cardsPack: initCardsPack[]
=======
    cardPacks: initCardsPack[]
>>>>>>> origin/master
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type CardsPackType = {
    packName: string
    min: number
    max: number
    sortPacks: number | string
    page: number
    pageCount: number
    user_id: string
}
export type NewUserType = {
    name: string
    avatar: string
}
type updatedUserResponseType = {
    updatedUser: {}
    error?: string
}
type logoutResponseType = {
    info: string
    error: string
}
type SendNewPassResponseType = {
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

export type LoginType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type SignInType<T = {}> = {
    data: signUpDataType
    rememberMe: boolean
}
export type userType = {
    id: string
    email: string
    name: string
    avatar: string
}
export type ResponseType<T = {}> = {
    error?: string
    body: loginResponseType
}
type loginResponseType = {
    data: userType
    created: any
    updated: any
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
}
