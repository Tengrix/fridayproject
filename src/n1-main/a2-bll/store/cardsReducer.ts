import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type CardsInitialStateType = {}
const cardsInitialState: CardsInitialStateType = {}

const slice = createSlice({
    name: "cardPacks",
    initialState: cardsInitialState,
    reducers: {
        getCards(state, action: PayloadAction<{}>) {},
    },
})

export const cardsReducer = slice.reducer
export const { getCards } = slice.actions
