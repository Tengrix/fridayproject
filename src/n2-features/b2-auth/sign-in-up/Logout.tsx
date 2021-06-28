import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PATH } from '../../../n1-main/a1-ui/routes/Routes';
import { LogoutTC } from '../../../n1-main/a2-bll/store/logout-reducer';
import { AppRootStateType } from '../../../n1-main/a2-bll/store/store';

const Logout = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLogged)

    const logoutHandler = useCallback(() => {
        dispatch(LogoutTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={PATH.SIGN_IN} />
    }

    return (
        <div>
            <button onClick={logoutHandler}>Logout</button>
            Logout in Here
        </div>
    )
}
export default Logout