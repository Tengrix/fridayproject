import React, {ChangeEvent, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/a2-bll/store/store";
import {UpdateUserInfo} from "../../n1-main/a2-bll/store/mainAuthReducer";
import {
    initCardsPack,
    NewUserType
} from "../../n1-main/a3-dal/mainAPI";
import {removeCardPackTC} from "../../n1-main/a2-bll/store/cardsPackReducer";
const UpdateProfile = () => {
    const dispatch = useDispatch()
    const oldName = useSelector<AppRootStateType,string>(state => state.auth.user.name)
    const oldAva = useSelector<AppRootStateType,string>(state => state.auth.user.avatar)
    const[name, setNewName] = useState<string>(oldName)
    const[avatar, setNewAva] = useState<string>(oldAva)
    const newData:NewUserType = {name,avatar}

    const changeName = () => {
        dispatch(UpdateUserInfo(newData))
    }
    const onChangeName = (e:ChangeEvent<HTMLInputElement>) =>{
        setNewName(e.currentTarget.value)
    }
    const onChangeAva = (e:ChangeEvent<HTMLInputElement>) =>{
        setNewAva(e.currentTarget.value)
    }
    const test = () => {
        dispatch(removeCardPackTC('5eb6cb9a7a82672138e0d7c1'))
    }
    return(
        <div>
            <input placeholder={'new name'} value={name} type="text" onChange={onChangeName}/>
            <input placeholder={'new URL for Ava'} value={avatar} type="text" onChange={onChangeAva}/>
            <button onClick={changeName}>Submit</button>
            <button onClick={test}> test </button>
        </div>
    )
}
export default UpdateProfile