import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'

function Header() {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' activeClassName={s.activeLink} replace> My Profile </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/sign-in' activeClassName={s.activeLink} replace>sign-in</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/sign-up' activeClassName={s.activeLink} replace>sign-up</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/new-pass' activeClassName={s.activeLink} replace>new Pass</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/renewal-pass' activeClassName={s.activeLink} replace>Get the new Pass</NavLink>
            </div>

        </nav>
    )
}

export default Header
