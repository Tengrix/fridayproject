import {
    authAPI,
    cardsPacksAPI,
    GetCardsPacksModuleType,
    initCardPacks,
    ResponseGetCardPacksType,
} from "../../a3-dal/mainAPI"
import { Dispatch } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { AppRootStateType } from "./store"
import { setCommonRegister } from "./mainAuthReducer"
import { switchLoadingState } from "./appReducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type initStateType = {
    cardPacks: Array<initCardPacks>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    showMyCardsPacks: boolean
}
const cardPacksInitialState: initStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 1,
    page: 0,
    pageCount: 4,
    showMyCardsPacks: false,
}

const slice = createSlice({
    name: "cardPacks",
    initialState: cardPacksInitialState,
    reducers: {
        getCardPacks(state, action: PayloadAction<{ cardPacks: Array<initCardPacks> }>) {
            state.cardPacks = action.payload.cardPacks
        },
        showMyCardsPacks(state, action: PayloadAction<{ isShow: boolean }>) {
            state.showMyCardsPacks = action.payload.isShow
        },
    },
})

export const cardPacksReducer = slice.reducer
export const { getCardPacks, showMyCardsPacks } = slice.actions

////////THUNKS/////////

export const getPackCards = () => (dispatch: Dispatch, getState: any) => {
    const module: GetCardsPacksModuleType = { params: {} }
    const userId = getState().auth.user._id
    const showMyCardsPacks = getState().cardPacks.showMyCardsPacks
    if (showMyCardsPacks) {
        module.params.user_id = userId
    } else {
        module.params.user_id = ""
    }

    dispatch(switchLoadingState({ valueInLoading: "loading" }))
    cardsPacksAPI
        .getCardsPacks(module)
        .then((res) => {
            dispatch(getCardPacks({ cardPacks: res.data.cardPacks }))
        })
        .catch((e) => {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            dispatch(setCommonRegister(error))
        })
        .finally(() => dispatch(switchLoadingState({ valueInLoading: "successed" })))
}
export const setNewCardPack =
    (name: string) =>
    (
        dispatch: ThunkDispatch<ResponseGetCardPacksType, AppRootStateType, any>,
        getState: () => AppRootStateType
    ) => {
        cardsPacksAPI
            .createCardsPack(name)
            .then((res) => {
                dispatch(getPackCards())
            })
            .catch((e) => {
                const error = e.res ? e.res.data.error : e.message + ", more details in the console"
                console.log("Error:", { ...e })
            })
    }
export const removeCardPack =
    (idPack: string) =>
    (dispatch: ThunkDispatch<ResponseGetCardPacksType, AppRootStateType, any>) => {
        cardsPacksAPI.deleteCardsPack(idPack).then(() => {
            dispatch(getPackCards())
        })
    }
export const updateCardPack =
    (id: string, name: string) =>
    (dispatch: ThunkDispatch<ResponseGetCardPacksType, AppRootStateType, any>) => {
        cardsPacksAPI.updateCardsPack(id, name).then((res) => {
            dispatch(getPackCards())
        })
    }
