import {applyMiddleware, combineReducers,createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {someReducer} from "./reducers";
import {loginReducer} from "./login-reducer";
import {signUpReduser} from "./signUp-reducer";
declare global {
    interface Window {store: any}
}
const rootReducer = combineReducers({
    some:someReducer,
    login:loginReducer,
    signUp:signUpReduser
})
export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
window.store = store
export default store;