import {
    authAPI,
    createCardsPackType, initCardsPack, ResponseCardsType
} from "../../a3-dal/mainAPI";
import {Dispatch} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";
import {setCommonRegister} from "./mainAuthReducer";

type ActionType = getCardsType
    // |getNewCardPack|delCardPack
type getCardsType = ReturnType<typeof getCardsPack>
type getNewCardPack = ReturnType<typeof newCardPack>
// type delCardPack = ReturnType<typeof removeCardPackAC>


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
type initStateType = {
    cardsPack:Array<initCardsPack>
}
const initialState:initStateType = {
    cardsPack:[]
}
export const cardsPackReducer = (
    state = initialState, action: ActionType) => {
    switch (action.type) {
        case 'GET-CARDS-PACK':
            return {...state, cardsPack:action.cardsPack}
        // case "NEW-PACK":
        //     return [{...action.newCardPack},...state]
        // case "REMOVE-PACK":
        //     return state.filter(el=>el._id !== action.id)
        default:
            return state
    }
}
const getCardsPack = (cardsPack: initCardsPack[]) => {
    return {
        type: 'GET-CARDS-PACK',
        cardsPack
    } as const
}
const newCardPack = (newCardPack:createCardsPackType) => {
    return{
        type:'NEW-PACK',
        newCardPack
    } as const
}
// const removeCardPackAC = (id:string) =>{
//     return{
//         type:'REMOVE-PACK',
//         id
//     } as const
// }

export const SetPackCards = () => (dispatch: Dispatch) => {
    authAPI.setCardsPack().
    then((res) => {
        dispatch(getCardsPack(res.data))
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
export const removeCardPackTC = (id:string) => (dispatch:ThunkDispatch<ResponseCardsType, AppRootStateType, ActionType>) => {
    authAPI.deletePack(id).then(()=>{
        dispatch(SetPackCards())
    })
}