<<<<<<< HEAD
import {
    authAPI,
    createCardsPackType,
    initCardsPack,
    ResponseCardsType,
} from "../../a3-dal/mainAPI"
=======
import { authAPI, initCardsPack, ResponseCardsType } from "../../a3-dal/mainAPI"
>>>>>>> origin/master
import { Dispatch } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { AppRootStateType } from "./store"
import { setCommonRegister } from "./mainAuthReducer"

<<<<<<< HEAD
type ActionType = getCardsType
// |getNewCardPack|delCardPack
=======
type ActionType = getCardsType | getCardType
>>>>>>> origin/master
type getCardsType = ReturnType<typeof getCardsPack>
type getCardType = ReturnType<typeof getCards>

<<<<<<< HEAD
// export type cardsPackInitStateType={
//     data:initCardsPack[],
//     cardPacksTotalCount:number;
//     maxCardsCount:number;
//     minCardsCount:number;
//     page:number;
//     pageCount:number;
//     cardsPack:createCardsPackType
//
// }
// const initialState:cardsPackInitStateType = {
//     data:[{
//         _id:'',
//         user_id:'',
//         name:'',
//         cardsCount:25,
//     }],
//     cardPacksTotalCount:14,
//     maxCardsCount:4,
//     minCardsCount:0,
//     page:1,
//     pageCount:0,
//     cardsPack:{
//         name:'',
//         private:false
//     }
//
// }
type initialStateType = {
    cardsPack: Array<initCardsPack>
}

const initialState: initialStateType = {
    cardsPack: [],
}

export const cardsPackReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "GET-CARDS-PACK":
            return { ...state, cardsPack: action.cardsPack.cardsPack }
        // case "NEW-PACK":
        //     return [{...action.newCardPack},...state]
        // case "REMOVE-PACK":
        //     return state.filter(el=>el._id !== action.id)
=======
type initStateType = {
    cardPacks: Array<initCardsPack>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
const initialState: initStateType = {
    cardPacks: [
        {
            name: "HELLO",
            _id: "",
            user_id: "",
            cardsCount: 5,
        },
    ],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 1,
    page: 0,
    pageCount: 4,
}
export const cardsPackReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "GET-CARDS-PACK":
            return { ...state, cardPacks: action.cardPacks }
        case "GET-CARD":
            return { ...state }

>>>>>>> origin/master
        default:
            return { ...state }
    }
}
<<<<<<< HEAD
const getCardsPack = (cardsPack: ResponseCardsType) => {
    debugger
    return {
        type: "GET-CARDS-PACK",
        cardsPack,
    } as const
}
const newCardPack = (newCardPack: createCardsPackType) => {
    return {
        type: "NEW-PACK",
        newCardPack,
=======
const getCardsPack = (cardPacks: initCardsPack[]) => {
    return {
        type: "GET-CARDS-PACK",
        cardPacks,
    } as const
}

const getCards = (id: string) => {
    return {
        type: "GET-CARD",
        id,
>>>>>>> origin/master
    } as const
}

export const SetPackCards = () => (dispatch: Dispatch) => {
    authAPI
        .setCardsPack()
        .then((res) => {
<<<<<<< HEAD
            dispatch(getCardsPack(res.data))
=======
            dispatch(getCardsPack(res.data.cardPacks))
>>>>>>> origin/master
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister(error))
        })
}
<<<<<<< HEAD
=======

>>>>>>> origin/master
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
<<<<<<< HEAD
    (id: string) => (dispatch: ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>) => {
        authAPI.deletePack(id).then(() => {
=======
    (idPack: string) =>
    (dispatch: ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>) => {
        authAPI.deletePack(idPack).then(() => {
            dispatch(SetPackCards())
        })
    }
export const updateCardPack =
    (id: string, name: string) =>
    (dispatch: ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>) => {
        authAPI.updatePack(id, name).then((res) => {
>>>>>>> origin/master
            dispatch(SetPackCards())
        })
    }
