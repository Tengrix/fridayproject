import React, { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { updateUserInfo } from "../../n1-main/a2-bll/store/mainAuthReducer"
import { NewUserType } from "../../n1-main/a3-dal/mainAPI"
import { TextField } from "@material-ui/core"
import s from "./Profile.module.css"
import Button from "@material-ui/core/Button"

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const oldName = useSelector<AppRootStateType, string>((state) => state.auth.user.name)
    const oldAva = useSelector<AppRootStateType, string>((state) => state.auth.user.avatar)
    const [name, setNewName] = useState<string>(oldName)
    const [avatar, setNewAva] = useState<string>(oldAva)
    const newData: NewUserType = { name, avatar }
    const changeName = () => {
        dispatch(updateUserInfo({ data: newData }))
    }
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const onChangeAva = (e: ChangeEvent<HTMLInputElement>) => {
        setNewAva(e.currentTarget.value)
    }

    return (
        <div className={s.updateProfile}>
            <TextField placeholder={"New name"} value={name} type="text" onChange={onChangeName} />
            <TextField
                placeholder={"New URL for Ava"}
                value={avatar}
                type="text"
                onChange={onChangeAva}
            />
            <Button variant="contained" color="primary" onClick={changeName}>
                Submit
            </Button>
        </div>
    )
}
export default UpdateProfile
