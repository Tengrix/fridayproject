import { Button } from '@material-ui/core';
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../n1-main/a2-bll/store/mainAuthReducer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Logout = () => {
    const dispatch = useDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={logoutHandler}>Logout<ExitToAppIcon/></Button>
        </div>
    )
}
export default Logout