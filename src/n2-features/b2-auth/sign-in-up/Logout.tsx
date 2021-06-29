import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import { LogoutTC } from '../../../n1-main/a2-bll/store/mainAuthReducer';
const Logout = () => {
    const dispatch = useDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(LogoutTC())
    }, [dispatch])

    return (
        <div>
            <button onClick={logoutHandler}>Logout</button>
            Logout in Here
        </div>
    )
}
export default Logout