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
}
export const cardsPacksAPI = {
    getCardsPacks(getModule: GetCardsPacksModuleType) {
        return instance.get<ResponseGetCardPacksType>(`cards/pack`, getModule)
    },
    createCardsPack(name: string) {
        return instance.post<CreateCardsPackResponceType>(`cards/pack`, {
            cardsPack: { name: name },
        })
    },
    deleteCardsPack(idPack: string) {
        return instance.delete<DeleteCardPackResponceType>(`cards/pack/?id=${idPack}`)
    },
    updateCardsPack(id: string, name: string) {
        return instance.put<UpdateCardsPackResponceType>(`cards/pack`, {
            cardsPack: { _id: id, name: name },
        })
    },
    updateGrade(card_id: string, grade: number) {
        return instance.put<CardType>("cards/grade", { card_id, grade })
    },
}
export const cardsAPI = {
    getCards(cardsPackId: string) {
        return instance.get<GetCardsResponceType>(`cards/pack?cardsPack_id=${cardsPackId}`)
    },
    createCard(createModule: CreateCardModuleType) {
        return instance.post<CreateCardResponceType>("cards/card", createModule)
    },
    updateCard(updateModule: UpdateCardModuleType) {
        return instance.put<UpdateCardResponceType>("cards/card", updateModule)
    },
    deleteCard(cardId: string) {
        return instance.delete<DeleteCardResponceType>(`cards/card?id=${cardId}`)
    },
}
//
//
//
//
//
export type CardType = {
    _id: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    card_id: string
}
export type GetCardsPacksModuleType = {
    params: {
        min?: number
        max?: number
        sortPacks?: "0updated" | "1updated" | "0cardsCount" | "1cardsCount"
        page?: number
        pageCount?: number
        user_id?: string
    }
}
export type CreateCardResponceType = {
    newCard: {}
}
export type UpdateCardResponceType = {
    updateCard: {}
}
export type DeleteCardResponceType = {
    deleteCard: {}
}
export type CreateCardsPackResponceType = {
    newCardsPack: {}
}
export type UpdateCardsPackResponceType = {
    updateCardsPack: {}
}
export type DeleteCardPackResponceType = {
    deleteCardsPack: {}
}
export type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
export type GetCardsResponceType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CreateCardModuleType = {
    card: {
        cardsPack_id: string
        question: string
        answer: string
        grade: number
        shots: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        _id: string
    }
}
export type UpdateCardModuleType = {
    card: {
        _id: string
        question?: string
    }
}
export type createCardPackType = {
    name: string
    private: boolean
}
export type initCardPacks = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created?: string
    updated?: string
}
export type ResponseGetCardPacksType = {
    cardPacks: Array<initCardPacks>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type CardPackType = {
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
    _id: string
    email: string
    name: string
    avatar: string
    error?: string
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
