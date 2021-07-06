import React, {useEffect} from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import {Routes} from "./routes/Routes";
import Header from "./header/Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../a2-bll/store/store";
import { isInitializedTC} from "../a2-bll/store/mainAuthReducer";
import Loading from './loading/Loading';

function App() {
    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootStateType,boolean>(state => state.auth.isInitialized)
    useEffect(()=>{
        dispatch(isInitializedTC())
    },[])

    return (
        <HashRouter>
        {!isInitialized ? <Loading/> : 
            <div className={'mainPage'}>
            <Header/>
            <Routes/>
            </div> 
        }
        </HashRouter>
    );
}
export default App;
