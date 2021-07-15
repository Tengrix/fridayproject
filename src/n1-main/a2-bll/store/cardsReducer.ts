import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
    cardsAPI,
    cardsPacksAPI,
    CardsType,
    GetCardsModuleType,
    GetCardsResponceType,
} from "../../a3-dal/mainAPI"
import { switchLoadingState } from "./appReducer"
import { setCommonRegister } from "./mainAuthReducer"

type CardsInitialStateType = {
    cards: Array<CardsType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
const cardsInitialState: CardsInitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 10,
    packUserId: "",
}

export const getCardsForCardsPack = createAsyncThunk(
    "cardPacks/get",
    async (getPacksData: { userID: string }, thunkAPI) => {
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "loading" }))
        try {
            const { cards } = thunkAPI.getState() as { cards: CardsInitialStateType }
            const module: GetCardsModuleType = {
                params: {
                    cardsPack_id: getPacksData.userID,
                    page: cards.page,
                    pageCount: cards.pageCount,
                },
            }
            const res = await cardsAPI.getCards(module)
            thunkAPI.dispatch(getCards({ response: res.data }))
        } catch (e) {
            const error = e.res ? e.res.data.error : e.message + ", more details in the console"
            console.log("Error:", { ...e })
            thunkAPI.dispatch(setCommonRegister(error))
        }
        thunkAPI.dispatch(switchLoadingState({ valueInLoading: "successed" }))
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
    },
})

export const cardsReducer = slice.reducer
export const { getCards } = slice.actions
