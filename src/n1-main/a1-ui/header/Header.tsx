<<<<<<< HEAD
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
            {isLogged && <div className={s.item}>
                <NavLink to={PATH.PACKS} activeClassName={s.activeLink} replace>
                    Packs
                </NavLink>
            </div>}
            {isLogged && <div className={s.item}>
                <NavLink to={PATH.CARDS} activeClassName={s.activeLink} replace>
                    Cards
                </NavLink>
            </div>}
        </nav>
=======
import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'
import {PATH} from "../routes/Routes";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../a2-bll/store/store";
import Logout from '../../../n2-features/b2-auth/sign-in-up/Logout';
import { Avatar, Button } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SettingsIcon from '@material-ui/icons/Settings';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function Header() {
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)

    return (
        <>
        {isLogged && <nav className={s.nav}>
        <div>
            <NavLink to={PATH.PROFILE} replace><Avatar><PermIdentityIcon/></Avatar></NavLink>
        </div>
       <div className={s.headerLink}>
       <div className={s.item}>
            <NavLink to={PATH.PROFILE} activeClassName={s.activeLink} replace><Button variant="outlined" ><PermIdentityIcon/>My Profile </Button></NavLink>
        </div>        
        <div className={s.item}>
            <NavLink to={PATH.NEW_PASS} activeClassName={s.activeLink} replace><Button variant="outlined" ><VpnKeyIcon/>New Password</Button></NavLink>
        </div>
         <div className={s.item}>
            <NavLink to={PATH.UPDATE_USER} activeClassName={s.activeLink} replace><Button variant="outlined"><SettingsIcon/> Settings </Button></NavLink>
        </div>
        <Logout/>
       </div>
    </nav> }
        </>
>>>>>>> origin/master
    )
}

export default Header
