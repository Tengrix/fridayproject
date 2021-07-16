import {
    cardsPacksAPI,
    GetCardsPacksModuleType,
    initCardPacks,
    ResponseGetCardPacksType,
} from "../../a3-dal/mainAPI"
import { AuthInitStateType, setCommonRegister } from "./mainAuthReducer"
import { switchLoadingState } from "./appReducer"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export type initCardsPacksStateType = {
    cardPacks: Array<initCardPacks>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    showMyCardsPacks: boolean
    newPageForShow: number
    currentPortionToPaginator: number
    sortCardsPacks: "0updated" | "1updated" | "0cardsCount" | "1cardsCount"
    packDeleted: boolean
}
const cardPacksInitialState: initCardsPacksStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 1,
    page: 0,
    pageCount: 4,
    showMyCardsPacks: false,
    newPageForShow: 1,
    currentPortionToPaginator: 1,
    sortCardsPacks: "0cardsCount",
    packDeleted: false,
}
export const getPackCards = createAsyncThunk("cardPacks/get", async (getPacksData, thunkAPI) => {
    const module: GetCardsPacksModuleType = {
        params: {
            pageCount: 10,
            sortPacks: "0cardsCount",
        },
    }
    const { auth } = thunkAPI.getState() as { auth: AuthInitStateType }
    const { cardPacks } = thunkAPI.getState() as { cardPacks: initCardsPacksStateType }
    //
    module.params.page = cardPacks.newPageForShow
    module.params.min = cardPacks.minCardsCount
    module.params.max = cardPacks.maxCardsCount
    module.params.sortPacks = cardPacks.sortCardsPacks
    if (cardPacks.showMyCardsPacks) {
        module.params.user_id = auth.user._id
    } else {
        module.params.user_id = ""
    }
    //
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
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            await cardsPacksAPI.deleteCardsPack(removePackData.idPack)
            thunkAPI.dispatch(deletedPack({ deleted: true }))
            thunkAPI.dispatch(getPackCards())
            thunkAPI.dispatch(deletedPack({ deleted: false }))
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            thunkAPI.dispatch(setCommonRegister(error))
        }
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
    }
)
export const createCardPack = createAsyncThunk(
    "cardPacks/setNewCardPack",
    async (createData: { newName: string }, thunkAPI) => {
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            await cardsPacksAPI.createCardsPack(createData.newName)
            thunkAPI.dispatch(getPackCards())
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
        }
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
    }
)
export const updateCardPack = createAsyncThunk(
    "cardPacks/update",
    async (updateData: { idPack: string; newTitle: string }, thunkAPI) => {
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            await cardsPacksAPI.updateCardsPack(updateData.idPack, updateData.newTitle)
            thunkAPI.dispatch(getPackCards())
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
        }
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
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
        changeNewPageForShowPacks(state, action: PayloadAction<{ newShowPage: number }>) {
            state.newPageForShow = action.payload.newShowPage
        },
        changePortionPacks(state, action: PayloadAction<{ currentPortion: number }>) {
            state.currentPortionToPaginator = action.payload.currentPortion
        },
        changeMaxMinCards(state, action: PayloadAction<{ newValue: number[] }>) {
            state.minCardsCount = action.payload.newValue[0]
            state.maxCardsCount = action.payload.newValue[1]
        },
        changeSort(
            state,
            action: PayloadAction<{
                newValue: "0updated" | "1updated" | "0cardsCount" | "1cardsCount"
            }>
        ) {
            state.sortCardsPacks = action.payload.newValue
        },
        deletedPack(state, action: PayloadAction<{ deleted: boolean }>) {
            state.packDeleted = action.payload.deleted
        },
    },
})

export const cardPacksReducer = slice.reducer
export const {
    getCardPacks,
    showMyCardsPacks,
    changeNewPageForShowPacks,
    changePortionPacks,
    changeMaxMinCards,
    changeSort,
    deletedPack,
} = slice.actions
