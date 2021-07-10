import { cardPacksReducer } from "./cardPacksReducer"
import { combineReducers } from "redux"
import { authReducer } from "./mainAuthReducer"
import thunk from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./appReducer"
import { cardsReducer } from "./cardsReducer"
declare global {
    interface Window {
        store: any
    }
}
const rootReducer = combineReducers({
    auth: authReducer,
    cardPacks: cardPacksReducer,
    cards: cardsReducer,
    app: appReducer,
})
// определить автоматически тип всего объекта состояния
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})
export type AppRootStateType = ReturnType<typeof rootReducer>
window.store = store
export default store
