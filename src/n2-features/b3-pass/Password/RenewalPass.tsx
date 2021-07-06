import { Button, TextField } from "@material-ui/core"
import { useFormik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { forgot } from "../../../n1-main/a2-bll/store/mainAuthReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import styles from "../../../utils/styles/CommonStylesForAuth.module.css"
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { NavLink } from "react-router-dom"
import { PATH } from "../../../n1-main/a1-ui/routes/Routes"

type FormikErrorType = {
    email?: string
}

const RenewalPass = () => {
    const message = `<div style="background-color: lime; padding: 15px"> 
    password recovery link: <a href='https://tengrix.github.io/fridayproject/#/new-pass/$token$'>Click to here</a></div>`
    const fogot = useSelector<AppRootStateType, boolean>((state) => state.auth.fogot)
    const commonError = useSelector<AppRootStateType, string>((state) => state.auth.commonError)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Email required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(forgot(values.email, message))
            formik.resetForm()
        },
    })
    if (fogot)
        return (
            <div className={styles.authBlock}>
                <div>Checked your email!</div>
                <div>
                <NavLink to={PATH.SIGN_IN}><Button variant="outlined"><KeyboardReturnIcon/></Button></NavLink>
                </div>
            </div>
        )
    return (
        <div className={styles.authBlock}>
            <form onSubmit={formik.handleSubmit} className={styles.inputBlock}>
                <TextField
                    placeholder="email"
                    name="email"
                    fullWidth
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <Button type="submit" variant="contained" color="secondary">Send message</Button>
                <NavLink to={PATH.SIGN_IN}><Button variant="outlined"><KeyboardReturnIcon/></Button></NavLink>
                {formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
                {commonError && <div style={{ color: "red" }}>{commonError}</div>}
            </form>
        </div>
    )
}
export default RenewalPass
