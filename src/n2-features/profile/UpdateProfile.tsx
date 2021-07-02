import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/a2-bll/store/store";
import {UpdateUserInfo} from "../../n1-main/a2-bll/store/mainAuthReducer";
import {NewUserType} from "../../n1-main/a3-dal/mainAPI";

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const oldName = useSelector<AppRootStateType,string>(state => state.auth.user.name)
    const oldAva = useSelector<AppRootStateType,string>(state => state.auth.user.avatar)
    const[name, setNewName] = useState<string>(oldName)
    const[avatar, setNewAva] = useState<string>(oldAva)
    const newData:NewUserType = {name,avatar}
    useEffect(()=>{
        dispatch(UpdateUserInfo(newData))
    },[newData])

    const onChangeName = (e:ChangeEvent<HTMLInputElement>) =>{
        setNewName(e.currentTarget.value)
    }
    const onChangeAva = (e:ChangeEvent<HTMLInputElement>) =>{
        setNewAva(e.currentTarget.value)
    }

    return(
        <div>
            <input placeholder={'new name'} value={name} type="text" onChange={onChangeName}/>
            <input placeholder={'new URL for Ava'} value={avatar} type="text" onChange={onChangeAva}/>
        </div>
    )
}
export default UpdateProfile