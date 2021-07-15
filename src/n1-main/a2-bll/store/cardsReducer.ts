import { Dispatch } from "redux"
import { authAPI, CardType, responseCardType } from "../../a3-dal/mainAPI"
import { setCommonRegister } from "./mainAuthReducer"

export type ActionType = getCardTypeAC
type getCardTypeAC = ReturnType<typeof getCardsAC>
type initialStateType = responseCardType

const initialState: initialStateType = {
    cards: [{
        answer: "no answer",		
        question: "no question",
        cardsPack_id: "5eb6a2f72f849402d46c6ac4",		
        grade: 4.987525071790364,		
        shots: 1,
        user_id: "142151531535151",	
        created: "2020-05-13T11:05:44.867Z",	
        updated: "2020-05-13T11:05:44.867Z",		
        _id: "5ebbd48876810f1ad0e7ece3"
    },
    {
        answer: "How old are you?",		
        question: "26",
        cardsPack_id: "5eb6a2f72f849402d46c6ac4",		
        grade: 4.987525071790364,		
        shots: 1,
        user_id: "142151531535151",	
        created: "2020-05-13T11:05:44.867Z",	
        updated: "2020-05-13T11:05:44.867Z",		
        _id: "5ebbd48876810f1ad0e7ece3"
    },	
    {
        answer: "Where are you from?",		
        question: "Belarus",
        cardsPack_id: "5eb6a2f72f849402d46c6ac4",		
        grade: 4.987525071790364,		
        shots: 1,
        user_id: "142151531535151",	
        created: "2020-05-13T11:05:44.867Z",	
        updated: "2020-05-13T11:05:44.867Z",		
        _id: "5ebbd48876810f1ad0e7ece3"
    }
    ],
    cardsTotalCount: 3,		
    maxGrade: 4.987525071790364	,	
    minGrade: 2.0100984354076568,		
    page: 1	,	
    pageCount: 4	,	
    packUserId: "5eecf82a3ed8f700042f1186",	
}


export const cardsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "CARDS/GET_CARDS":
            return {...state,...action.cards}
        default:
        return {...state}
    }

}

const getCardsAC = (cards: initialStateType) => {
    return {
        type: "CARDS/GET_CARDS",
        cards
    } as const
}

const updatedCardAC = (updatedCard:CardType) => {
    return {
        type:"CARDS/GRADE",
        updatedCard
    }
}

export const getCardsTC = (cardsPack_id: string) => (dispatch: Dispatch) => {
    authAPI
        .getCards(cardsPack_id)
        .then((res) => {
            dispatch(getCardsAC(res.data))
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister(error))
        })
}
export const createCardsTC = (cardsPack_id: string) => (dispatch: Dispatch<any>) => {
    authAPI
        .setCards(cardsPack_id)
        .then(() => {
            dispatch(getCardsTC(cardsPack_id))
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister(error))
        })
}
export const deleteCardsTC = (id: string, cardsPack_id: string) => (dispatch: Dispatch<any>) => {
    authAPI.deleteCards(id)
        .then(() => {
            dispatch(getCardsTC(cardsPack_id))
        })
        .catch((error) => {
            dispatch(setCommonRegister(error.response.data.error))
        })
}

export const updateCardsTc = (id: string, cardsPack_id: string) => (dispatch: Dispatch<any>) => {
    authAPI.updateCards(id)
        .then(() => {
            dispatch(getCardsTC(cardsPack_id))
        })
        .catch((error) => {
            dispatch(setCommonRegister(error.response.data.error))
        })
}
export const updateGradeTc = (grade: number, cardsPack_id: string) => (dispatch: Dispatch<any>) => {
    authAPI.updateGrade(cardsPack_id, grade)
        .then((res) => {
            dispatch(updatedCardAC(res.data))
        })
        .catch((error) => {
            dispatch(setCommonRegister(error.response.data.error))
        })
}