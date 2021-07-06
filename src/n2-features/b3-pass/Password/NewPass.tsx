import { Button, TextField } from "@material-ui/core"
import { useFormik } from "formik"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { SetNewPassword } from "../../../n1-main/a2-bll/store/mainAuthReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import styles from "../../../utils/styles/CommonStylesForAuth.module.css"

type FormikErrorType = {
    password?: string
    confPass?: string
}

const NewPass = () => {
    const isUpdatedPassword = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isUpdatedPassword
    )
    const commonError = useSelector<AppRootStateType, string>((state) => state.auth.commonError)
    const dispatch = useDispatch()
    const { token } = useParams<{ token: string }>()
    const formik = useFormik({
        initialValues: {
            password: "",
            confPass: "",
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.password.length < 7) {
                errors.password = "Password should be longer 7 symbols"
            }
            if (values.password !== values.confPass) {
                errors.password = "Password not identical"
            }
            return errors
        },
        onSubmit: (values) => {
            debugger
            dispatch(SetNewPassword(values.password, token))
            formik.resetForm()
        },
    })
    if (isUpdatedPassword) {
        return <Redirect to={"/sign-in"} />
    }
    return (
        <div className={styles.authBlock}>
            <form onSubmit={formik.handleSubmit} className={styles.inputBlock}>
                <TextField
                 variant="outlined"
                    placeholder="Password:"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <TextField
                variant="outlined"
                    placeholder="Confirm password:"
                    name="confPass"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confPass}
                />
                {formik.errors.password && (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                )}
                <Button variant="contained" color="secondary" type={"submit"}>Change password</Button>
                <div style={{ color: "red" }}>{commonError}</div>
            </form>
        </div>
    )
}
export default NewPass
