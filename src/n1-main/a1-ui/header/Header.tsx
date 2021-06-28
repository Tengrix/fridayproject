import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
import { PATH } from "../routes/Routes";

function Header() {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to={PATH.PROFILE} activeClassName={s.activeLink} replace> My Profile </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={PATH.SIGN_IN} activeClassName={s.activeLink} replace>sign-in</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={PATH.SIGN_UP} activeClassName={s.activeLink} replace>sign-up</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={PATH.NEW_PASS} activeClassName={s.activeLink} replace>new Pass</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to={PATH.RENEWAL_PASS} activeClassName={s.activeLink} replace>Get the new Pass</NavLink>
            </div>

        </nav>
    )
}

export default Header
