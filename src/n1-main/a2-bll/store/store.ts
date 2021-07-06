import {applyMiddleware, combineReducers,createStore} from 'redux';
import {authReducer} from "./mainAuthReducer";
import thunk from "redux-thunk";
import {cardsPackReducer} from "./cardsPackReducer";
declare global {
    interface Window {store: any}
}
const rootReducer = combineReducers({
    auth:authReducer,
    cards:cardsPackReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
window.store = store
export default store;