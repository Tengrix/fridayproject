import {applyMiddleware, combineReducers,createStore} from 'redux';
import {someReducer} from "./reducers";
import {loginReducer} from "./login-reducer";
import thunkMiddleware from 'redux-thunk'
const rootReducer = combineReducers({
    some:someReducer,
    login:loginReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store
export default store