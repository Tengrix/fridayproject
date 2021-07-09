import {
    authAPI,
    createCardsPackType, initCardsPack, ResponseCardsType
} from "../../a3-dal/mainAPI";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";
import {setCommonRegister} from "./mainAuthReducer";

type ActionType = getCardsType|getCardType
type getCardsType = ReturnType<typeof getCardsPack>


type getCardType = ReturnType<typeof getCards>

type initStateType = {
    cardsPack:Array<initCardsPack>
    cardPacksTotalCount:number;
    maxCardsCount:number;
    minCardsCount:number;
    page:number;
    pageCount:number;
}
const initialState:initStateType = {
    cardsPack:[{
        name:'HELLO',
        _id:'',
        user_id:'',
        cardsCount:5
    }],
    cardPacksTotalCount:14,
    maxCardsCount:4,
    minCardsCount:1,
    page:0,
    pageCount:4,
}
export const cardsPackReducer = (
    state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'GET-CARDS-PACK':
            return {...state, cardsPack:action.cardsPack}
        case "GET-CARD":
            return {...state}
        default:
            return {...state}
    }
}
const getCardsPack = (cardsPack: initCardsPack[]) => {
    return {
        type: 'GET-CARDS-PACK',
        cardsPack
    } as const
}

const getCards = (id:string) => {
    return{
        type:'GET-CARD',
        id
    } as const
}

export const SetPackCards = () => (dispatch: Dispatch) => {
    authAPI.setCardsPack().
    then((res) => {
        dispatch(getCardsPack(res.data.cardsPack))
    }).catch((e) => {
        const error = e.res ? e.res.data.error : e.message + ", more details in the console"
        console.log("Error:", {...e})
        dispatch(setCommonRegister(error))
    })
}
export const setNewCardsPack = (name:string) => (dispatch: ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>, getState: () => AppRootStateType) => {
    authAPI.createCardsPack(name).then((res) => {
        dispatch(SetPackCards())
    }).catch((e) => {
        const error = e.res ? e.res.data.error : e.message + ", more details in the console"
        console.log("Error:", {...e})
    })
}
export const removeCardPackTC = () => (dispatch:ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>) => {
    authAPI.deletePack().then(()=>{
        dispatch(SetPackCards())
    })
}
export const updateCardPack = (id:string,name:string) => (dispatch:ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>) =>{
    authAPI.updatePack(id,name).then((res)=>{
        dispatch(SetPackCards())
    })
}

