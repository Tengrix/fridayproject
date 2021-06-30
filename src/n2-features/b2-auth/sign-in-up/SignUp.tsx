import { useFormik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {  Redirect } from "react-router-dom"
import { signUpTC } from "../../../n1-main/a2-bll/store/mainAuthReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import styles from "../../../utils/styles/CommonStylesForAuth.module.css"

type FormikErrorType = {
    email?: string
    password?: string
    confPass?: string
}

const SignUp = () => {
    const isRegister = useSelector<AppRootStateType, boolean>((state) => state.auth.isRegister)
    const commonError = useSelector<AppRootStateType, string>((state) => state.auth.commonError)
    const dispatch = useDispatch()
    const sendDataToRegister = (email: string, password: string) => {
        dispatch(signUpTC(email, password))
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confPass: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = "Email required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            if (!values.password) {
                errors.password = "Password required"
            } else if (values.password.length < 7) {
                errors.password = "Password should be longer 7 symbols"
            }
            if (values.password !== values.confPass) {
                errors.password = "Password not identical"
            }
            return errors
        },
        onSubmit: (values) => {
            formik.resetForm()
            sendDataToRegister(values.email, values.password)
        },
    })
    if (isRegister) {
        return <Redirect to={"/sign-in"} />
    }
    return (
        <div className={styles.authBlock}>
            <form className={styles.inputBlock} onSubmit={formik.handleSubmit}>
                <input
                    placeholder="email:"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}
                <input
                    placeholder="password:"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <input
                    placeholder="confirm password:"
                    name="confPass"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confPass}
                />
                {formik.errors.password && (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
                <button type={"submit"}>Sign up</button>

                <div style={{ color: "red" }}>{commonError}</div>
            </form>
        </div>
    )
}
export default SignUp
