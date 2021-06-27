import React from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import {Routes} from "./routes/Routes";
import Header from "./header/Header";

function App() {
    return (
        <HashRouter>
            <div className={'mainPage'}>
                <Header/>
                <Routes/>
            </div>
        </HashRouter>
    );
}

export default App;
