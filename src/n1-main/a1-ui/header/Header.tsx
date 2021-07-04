import React from "react"
import { NavLink } from "react-router-dom"
import s from "./Header.module.css"
import { PATH } from "../routes/Routes"
import { useSelector } from "react-redux"
import { AppRootStateType } from "../../a2-bll/store/store"
import Logout from "../../../n2-features/b2-auth/sign-in-up/Logout"

function Header() {
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    return (
        <nav className={s.nav}>
            <span className={s.logOut}>{isLogged && <Logout />}</span>
            {isLogged && (
                <div className={s.item}>
                    <NavLink to={PATH.UPDATE_USER} activeClassName={s.activeLink} replace>
                        {" "}
                        Settings{" "}
                    </NavLink>
                </div>
            )}
            {isLogged && <div className={s.item}>
                <NavLink to={PATH.PROFILE} activeClassName={s.activeLink} replace>
                    {" "}
                    My Profile{" "}
                </NavLink>
            </div>}
            {!isLogged && <div className={s.item}>
                <NavLink to={PATH.SIGN_IN} activeClassName={s.activeLink} replace>
                    sign-in
                </NavLink>
            </div>}
            {!isLogged && <div className={s.item}>
                <NavLink to={PATH.SIGN_UP} activeClassName={s.activeLink} replace>
                    sign-up
                </NavLink>
            </div>}
            {/* <div className={s.item}>
                <NavLink to={PATH.NEW_PASS} activeClassName={s.activeLink} replace>new Pass</NavLink>
            </div> */}
            {!isLogged && <div className={s.item}>
                <NavLink to={PATH.RENEWAL_PASS} activeClassName={s.activeLink} replace>
                    Get the new Pass
                </NavLink>
            </div>}
        </nav>
    )
}

export default Header
