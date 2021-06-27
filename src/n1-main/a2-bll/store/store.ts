import {combineReducers,createStore} from 'redux';
import {someReducer} from "./reducers";
import { signUpReduser } from './signUp-reducer';
declare global {
    interface Window {store: any}
}
const rootReducer = combineReducers({
    some:someReducer,
    signUp: signUpReduser
})
export const store = createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
window.store = window.store || {}
export default store;