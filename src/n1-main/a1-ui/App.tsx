import React from 'react';
import {HashRouter} from 'react-router-dom';
import './App.css';
import {Routes} from "./routes/Routes";
import Header from "./header/Header";
//checking new branch
function App() {
    return (
        <HashRouter>
            <div>
                <Header/>
                <Routes/>
            </div>
        </HashRouter>
    );
}

export default App;
