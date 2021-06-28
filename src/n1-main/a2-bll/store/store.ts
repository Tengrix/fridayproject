import { logoutReducer } from './logout-reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { someReducer } from "./reducers";
declare global {
    interface Window { store: any }
}
const rootReducer = combineReducers({
    some: someReducer,
    logout: logoutReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
window.store = window.store || {}
export default store;