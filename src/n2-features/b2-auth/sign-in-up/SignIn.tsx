import React, {useState} from 'react'
import SuperButton from "../../../n3-MySuperComponents/SuperButton/SuperButton";
import SuperInputText from "../../../n3-MySuperComponents/SuperInputText/SuperInputText";
import {useDispatch, useSelector} from "react-redux";
import {LoginTC} from "../../../n1-main/a2-bll/store/login-reducer";
import SuperCheckbox from "../../../n3-MySuperComponents/SuperCheckbox/SuperCheckbox";
import {AppRootStateType} from "../../../n1-main/a2-bll/store/store";
import {Redirect} from "react-router-dom";
import {PATH} from "../../../n1-main/a1-ui/routes/Routes";

const SignIn = () => {
    const dispatch=useDispatch()
    const isLogged = useSelector<AppRootStateType,boolean>(state => state.login.isLogged)
    const [email,setEmail] = useState<string>('')
    const [password,setPass] = useState<string>('')
    const [rememberMe,setRememberMe] = useState<boolean>(false)
    const LogInToAccount = () => {
        dispatch(LoginTC(email,password,rememberMe))
    }
    if(isLogged){
        return <Redirect to={PATH.PROFILE}/>
    }else{

    }
    return(
        <div>
            <div>
                <SuperInputText type={'text'} value={email} onChange={e => setEmail(e.currentTarget.value)}/>
            </div>
            <div>
                <SuperInputText type={'text'} value={password} onChange={e => setPass(e.currentTarget.value)}/>
            </div>
            <div>
                <SuperCheckbox type={'checkbox'} checked={rememberMe} onChange={e=>setRememberMe(e.currentTarget.checked)}/>
            </div>
            <SuperButton onClick={LogInToAccount}>
                Sign in HERE
            </SuperButton>

        </div>
    )
}
export default SignIn