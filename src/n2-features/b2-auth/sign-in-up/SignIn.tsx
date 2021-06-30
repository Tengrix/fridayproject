import React from "react"
import SuperButton from "../../../n3-MySuperComponents/SuperButton/SuperButton"
import SuperInputText from "../../../n3-MySuperComponents/SuperInputText/SuperInputText"
import { useDispatch, useSelector } from "react-redux"
import { LoginTC } from "../../../n1-main/a2-bll/store/mainAuthReducer"
import SuperCheckbox from "../../../n3-MySuperComponents/SuperCheckbox/SuperCheckbox"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import { NavLink, Redirect } from "react-router-dom"
import { PATH } from "../../../n1-main/a1-ui/routes/Routes"
import { useFormik } from "formik"
import styles from "../../../utils/styles/CommonStylesForAuth.module.css"

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const SignInWithFormik = () => {
    const dispatch = useDispatch()
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
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
            } else if (values.password.length < 4) {
                errors.password = "Invalid password"
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(LoginTC(values.email, values.password, values.rememberMe))
            formik.resetForm()
        },
    })
    if (isLogged) {
        return <Redirect to={PATH.PROFILE} />
    }

    return (
        <form onSubmit={formik.handleSubmit} className={styles.authBlock}>
            <div className={styles.inputBlock}>
                <div>
                    <SuperInputText
                        placeholder={"Username or email"}
                        type={"email"}
                        {...formik.getFieldProps("email")}
                    />
                </div>
                {formik.touched.email && formik.errors.email && (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                )}

                <div>
                    <SuperInputText
                        placeholder={"password"}
                        type={"password"}
                        {...formik.getFieldProps("password")}
                    />
                </div>
                {formik.touched.password && formik.errors.password && (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
                <div>
                    <SuperCheckbox type={"rememberMe"} {...formik.getFieldProps("rememberMe")} />
                </div>

                <SuperButton type={"submit"}>Sign in HERE</SuperButton>
                <div>
                    <NavLink to={PATH.RENEWAL_PASS}>Forgot password</NavLink>
                </div>
            </div>
        </form>
    )
}
export default SignInWithFormik
