import { Redirect, Route, Switch } from "react-router-dom"
import Profile from "../../../n2-features/b6-profile/Profile"
import Error from "../../../n2-features/b4-errors/error/Error"
import React from "react"
import RenewalPass from "../../../n2-features/b3-pass/Password/RenewalPass"
import SignInWithFormik from "../../../n2-features/b2-auth/sign-in-up/SignIn"
import SignUp from "../../../n2-features/b2-auth/sign-in-up/SignUp"
import NewPass from "../../../n2-features/b3-pass/Password/NewPass"
import UpdateProfile from "../../../n2-features/b6-profile/UpdateProfile"
import Cards from "../../../n2-features/b5-cardsPack/Cards/Cards"
import CardPacksPage from "../../../n2-features/b5-cardsPack/cardsPacksPage/CardPacksPage"
import CardsPack from "../../../n2-features/b5-cardsPack/cardsPacksPage/CardsPack"


export const PATH = {
    PROFILE: "/profile",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    NEW_PASS: "/new-pass/:token?",
    RENEWAL_PASS: "/renewal-pass",
    ERROR: "/404",
    UPDATE_USER: "/update-user",
    PACKS: "/packs",
    CARDS: "/cards/:userID?",
    PACKS_RAW: "/packs-raw",
}
export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={"/"} exact component={Profile} />
                <Route path={PATH.PROFILE} component={Profile} />
                <Route path={PATH.PROFILE} component={Error} />
                <Route path={PATH.SIGN_IN} component={SignInWithFormik} />
                <Route path={PATH.SIGN_UP} component={SignUp} />
                <Route path={PATH.NEW_PASS} component={NewPass} />
                <Route path={PATH.RENEWAL_PASS} component={RenewalPass} />
                <Route path={PATH.UPDATE_USER} component={UpdateProfile} />
                <Route path={PATH.PACKS} component={CardPacksPage} />
                <Route path={PATH.CARDS} component={Cards} />
                <Route path={PATH.PACKS_RAW} component={CardsPack} />
                <Route path={"/404"} render={() => <h1>404:PAGE NOT FOUND</h1>} />
                <Redirect from={"*"} to={PATH.ERROR} />
            </Switch>
        </div>
    )
}
