import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/a2-bll/store/store";
import {GetUserTC} from "../../n1-main/a2-bll/store/mainAuthReducer";
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-main/a1-ui/routes/Routes";


const Profile = () => {

    const dispatch = useDispatch()
    const userName = useSelector<AppRootStateType, string>(state => state.auth.user.name)
    const userEmail = useSelector<AppRootStateType, string>(state => state.auth.user.email)
    const userAvatar = useSelector<AppRootStateType, string | undefined>(state => state.auth.user.avatar)
    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)
    useEffect(()=>{
        dispatch(GetUserTC())
    },[dispatch])

    if (!isLogged) {
        return <Redirect to={PATH.SIGN_IN}/>
    }
    return (
        <div>
            <div>
                <img src={userAvatar} alt=""/>
            </div>
            <div>
                {userName}
            </div>
            <div>
                {userEmail}
            </div>

        </div>
    )
}
export default Profile;