import { useFormik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { PATH } from "../../../n1-main/a1-ui/routes/Routes"
import { forgot } from "../../../n1-main/a2-bll/store/mainAuthReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import SuperInputText from "../../../n3-MySuperComponents/SuperInputText/SuperInputText"
import styles from "../../../utils/styles/CommonStylesForAuth.module.css"

const RenewalPass = () => {
    const message = `<div style="background-color: lime; padding: 15px"> 
    password recovery link: <a href='https://Tengrix.github.io/fridayproject/#/new-pass/$token$'>Click to here</a></div>`
    const fogot = useSelector<AppRootStateType, boolean>((state) => state.auth.fogot)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {},
        onSubmit: (values) => {
            dispatch(forgot(values.email, message))
            formik.resetForm()
        },
    })
    if (fogot)
        return (
            <div className={styles.authBlock}>
                <div>Checked your email!</div>
            </div>
        )
    return (
        <div className={styles.authBlock}>
            <form onSubmit={formik.handleSubmit}>
                <input
                    placeholder="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <button type="submit">Enter</button>
            </form>
        </div>
    )
}
export default RenewalPass
