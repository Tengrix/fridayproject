import { cardPacksReducer } from "./cardPacksReducer"
import { combineReducers, compose } from "redux"
import thunk from "redux-thunk"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "./appReducer"
import { cardsReducer } from "./cardsReducer"
import { authReducer } from "./mainAuthReducer"
// declare global {
//     interface Window {
//         store: any
//     }
// }
const rootReducer = combineReducers({
    auth: authReducer,
    cardPacks: cardPacksReducer,
    app: appReducer,
    cards: cardsReducer,
})
// определить автоматически тип всего объекта состояния
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export type AppRootStateType = ReturnType<typeof rootReducer>
//window.store = store
export default store


