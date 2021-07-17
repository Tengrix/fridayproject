import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    cardsAPI,
    CardsType,
    CreateCardModuleType,
    GetCardsModuleType,
    GetCardsResponceType,
    UpdateCardModuleType,
} from "../../a3-dal/mainAPI"
import { switchLoadingState } from "./appReducer"
import { AuthInitStateType, setCommonRegister } from "./mainAuthReducer"

export type CardsInitialStateType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
    currentPortionToPaginator: number
    newPageForShow: number
}
const cardsInitialState: CardsInitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: "",
    currentPortionToPaginator: 1,
    newPageForShow: 1,
}

export const getCardsForCardsPack = createAsyncThunk(
    "cardPacks/get",
    async (getPacksData: { packID: string }, thunkAPI) => {
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            const { cards } = thunkAPI.getState() as { cards: CardsInitialStateType }
            const module: GetCardsModuleType = {
                params: {
                    cardsPack_id: getPacksData.packID,
                    page: cards.newPageForShow,
                    pageCount: cards.pageCount,
                },
            }
            const res = await cardsAPI.getCards(module)
            thunkAPI.dispatch(getCards({ response: res.data }))
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            thunkAPI.dispatch(setCommonRegister(error))
        } finally {
            thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
        }
    }
)
export const createCard = createAsyncThunk(
    "cardPacks/createCard",
    async (createCardData: { question: string; answer: string; cardsPackId: string }, thunkAPI) => {
        const { auth } = thunkAPI.getState() as { auth: AuthInitStateType }
        let createModule: CreateCardModuleType = {
            card: {
                _id: auth.user._id,
                cardsPack_id: createCardData.cardsPackId,
                question: createCardData.question,
                answer: createCardData.answer,
            },
        }
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            await cardsAPI.createCard(createModule)
            await thunkAPI.dispatch(getCardsForCardsPack({ packID: createCardData.cardsPackId }))
        } catch (e) {
        } finally {
            thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
        }
    }
)
export const deleteCard = createAsyncThunk(
    "cardPacks/deleteCard",
    async (deleteData: { idCard: string; cardsPackId: string }, thunkAPI) => {
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            await cardsAPI.deleteCard(deleteData.idCard)
            await thunkAPI.dispatch(getCardsForCardsPack({ packID: deleteData.cardsPackId }))
        } catch (e) {
        } finally {
            thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
        }
    }
)
export const updateCard = createAsyncThunk(
    "cardPacks/updateCard",
    async (
        updateData: { idCard: string; question: string; answer: string; packID: string },
        thunkAPI
    ) => {
        let createModule: UpdateCardModuleType = {
            card: {
                _id: updateData.idCard,
                question: updateData.question,
                answer: updateData.answer,
            },
        }
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            await cardsAPI.updateCard(createModule)
            await thunkAPI.dispatch(getCardsForCardsPack({ packID: updateData.packID }))
        } catch (e) {
        } finally {
            thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
        }
    }
)
const slice = createSlice({
    name: "cardPacks",
    initialState: cardsInitialState,
    reducers: {
        getCards(state, action: PayloadAction<{ response: GetCardsResponceType }>) {
            state.cards = action.payload.response.cards
            state.cardsTotalCount = action.payload.response.cardsTotalCount
            state.maxGrade = action.payload.response.maxGrade
            state.minGrade = action.payload.response.minGrade
            state.packUserId = action.payload.response.packUserId
            state.page = action.payload.response.page
            state.pageCount = action.payload.response.pageCount
        },
        changeNewPageForShowCards(state, action: PayloadAction<{ newShowPage: number }>) {
            state.newPageForShow = action.payload.newShowPage
        },
        changePortionCards(state, action: PayloadAction<{ currentPortion: number }>) {
            state.currentPortionToPaginator = action.payload.currentPortion
        },
    },
})

export const cardsReducer = slice.reducer
export const { getCards, changeNewPageForShowCards, changePortionCards } = slice.actions
