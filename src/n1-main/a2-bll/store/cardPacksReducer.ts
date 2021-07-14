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
import { AuthInitStateType, setCommonRegister } from "./mainAuthReducer"
import { switchLoadingState } from "./appReducer"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

type initStateType = {
    cardPacks: Array<initCardPacks>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    showMyCardsPacks: boolean
    newPageForShow: number
}
const cardPacksInitialState: initStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 1,
    page: 0,
    pageCount: 4,
    showMyCardsPacks: false,
    newPageForShow: 1,
}
export const getPackCards = createAsyncThunk("cardPacks/get", async (getPacksData, thunkAPI) => {
    const module: GetCardsPacksModuleType = {
        params: {
            pageCount: 10,
        },
    }
    const { auth } = thunkAPI.getState() as { auth: AuthInitStateType }
    const userId = auth.user._id
    const { cardPacks } = thunkAPI.getState() as { cardPacks: initStateType }
    const newPageForShow = cardPacks.newPageForShow
    module.params.page = newPageForShow
    if (cardPacks.showMyCardsPacks) {
        module.params.user_id = userId
    } else {
        module.params.user_id = ""
    }

    thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))

    try {
        const res = await cardsPacksAPI.getCardsPacks(module)
        thunkAPI.dispatch(getCardPacks({ newState: res.data }))
    } catch (e) {
        const error = e.res ? e.res.data.error : e.message + ", more details in the console"
        console.log("Error:", { ...e })
        thunkAPI.dispatch(setCommonRegister(error))
    }
    thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
})
export const removeCardPack = createAsyncThunk(
    "cardPacks/removeCardPack",
    async (removePackData: { idPack: string }, thunkAPI) => {
        try {
            await cardsPacksAPI.deleteCardsPack(removePackData.idPack)
            thunkAPI.dispatch(getPackCards())
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            thunkAPI.dispatch(setCommonRegister(error))
        }
    }
)
export const setNewCardPack = createAsyncThunk(
    "cardPacks/setNewCardPack",
    async (createData: { newName: string }, thunkAPI) => {
        try {
            await cardsPacksAPI.createCardsPack(createData.newName)
            thunkAPI.dispatch(getPackCards())
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
        }
    }
)
export const updateCardPack = createAsyncThunk(
    "cardPacks/update",
    async (updateData: { idPack: string; newTitle: string }, thunkAPI) => {
        try {
            await cardsPacksAPI.updateCardsPack(updateData.idPack, updateData.newTitle)
            thunkAPI.dispatch(getPackCards())
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
        }
    }
)

const slice = createSlice({
    name: "cardPacks",
    initialState: cardPacksInitialState,
    reducers: {
        getCardPacks(state, action: PayloadAction<{ newState: ResponseGetCardPacksType }>) {
            state.cardPacks = action.payload.newState.cardPacks
            state.cardPacksTotalCount = action.payload.newState.cardPacksTotalCount
            state.maxCardsCount = action.payload.newState.maxCardsCount
            state.minCardsCount = action.payload.newState.minCardsCount
            state.page = action.payload.newState.page
            state.pageCount = action.payload.newState.pageCount
        },
        showMyCardsPacks(state, action: PayloadAction<{ isShow: boolean }>) {
            state.showMyCardsPacks = action.payload.isShow
        },
        changeNewPageForShow(state, action: PayloadAction<{ newShowPage: number }>) {
            state.newPageForShow = action.payload.newShowPage
        },
    },
})

export const cardPacksReducer = slice.reducer
export const { getCardPacks, showMyCardsPacks, changeNewPageForShow } = slice.actions
