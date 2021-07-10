import React, { useEffect } from "react"
import { HashRouter, Redirect } from "react-router-dom"
import "./App.css"
import { PATH, Routes } from "./routes/Routes"
import Header from "./header/Header"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../a2-bll/store/store"
import Loading from "./loading/Loading"
import {isInitializedTC} from "../a2-bll/store/appReducer"

function App() {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])
    if (!isInitialized) return <Loading />

    return (
        <HashRouter>
            {!isLogged && <Redirect to={PATH.SIGN_IN} />}
            <div className={"mainPage"}>
                <Header />
                <Routes />
            </div>
        </HashRouter>
    )
}
export default App
