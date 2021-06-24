import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Profile from "../../profile/Profile";
import Error from "../../error/Error";
import {Provider} from "react-redux";
import store from "../a2-bll/store/store";

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path={'/'} render={() => <Redirect to={'/sign'}/>}/>
                        <Route path={'/profile'} render={() => <Profile/>}/>
                        <Route path={'/404'} render={() => <Error/>}/>
                        <Route path={'/'} render={() => <Redirect to={'/sign'}/>}/>
                    </Switch>
                </HashRouter>
            </Provider>
        </div>

    );
}

export default App;
