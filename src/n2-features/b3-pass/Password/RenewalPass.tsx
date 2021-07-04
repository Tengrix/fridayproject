import { useFormik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { forgot } from "../../../n1-main/a2-bll/store/mainAuthReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import styles from "../../../utils/styles/CommonStylesForAuth.module.css"

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
            </div>
        )
    return (
        <div className={styles.authBlock}>
            <form onSubmit={formik.handleSubmit} className={styles.inputBlock}>
                <input
                    placeholder="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <button type="submit">Send message</button>
                {formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
                {commonError && <div style={{ color: "red" }}>{commonError}</div>}
            </form>
        </div>
    )
}
export default RenewalPass
