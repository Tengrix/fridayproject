import {
    authAPI,
    createCardsPackType,
    initCardsPack,
    ResponseCardsType,
} from "../../a3-dal/mainAPI"
import { Dispatch } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { AppRootStateType } from "./store"
import { setCommonRegister } from "./mainAuthReducer"

type ActionType = getCardsType
type getCardsType = ReturnType<typeof getCardsPack>
type getNewCardPack = ReturnType<typeof newCardPack>

type initStateType = {
    cardsPack: initCardsPack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
const initialState: initStateType = {
    cardsPack: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
}
export const cardsPackReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "GET-CARDS-PACK":
            return { ...state, cardsPack: action.cardsPack }
        default:
            return state
    }
}
const getCardsPack = (cardsPack: initCardsPack[]) => {
    return {
        type: "GET-CARDS-PACK",
        cardsPack,
    } as const
}
const newCardPack = (newCardPack: createCardsPackType) => {
    return {
        type: "NEW-PACK",
        newCardPack,
    } as const
}

export const SetPackCards = () => (dispatch: Dispatch) => {
    authAPI
        .setCardsPack()
        .then((res) => {
            dispatch(getCardsPack(res.data.cardsPack))
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister(error))
        })
}
export const setNewCardsPack =
    (name: string) =>
    (
        dispatch: ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>,
        getState: () => AppRootStateType
    ) => {
        authAPI
            .createCardsPack(name)
            .then((res) => {
                dispatch(SetPackCards())
            })
            .catch((e) => {
                const error = e.res ? e.res.data.error : e.message + ", more details in the console"
                console.log("Error:", { ...e })
            })
    }
export const removeCardPackTC =
    (id: string) => (dispatch: ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>) => {
        authAPI.deletePack(id).then(() => {
            dispatch(SetPackCards())
        })
    }
