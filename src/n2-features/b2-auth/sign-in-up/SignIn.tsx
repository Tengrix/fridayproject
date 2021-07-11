import React from "react"
import SuperButton from "../../../n3-MySuperComponents/SuperButton/SuperButton"
import SuperInputText from "../../../n3-MySuperComponents/SuperInputText/SuperInputText"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../../n1-main/a2-bll/store/mainAuthReducer"
import SuperCheckbox from "../../../n3-MySuperComponents/SuperCheckbox/SuperCheckbox"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import { NavLink, Redirect } from "react-router-dom"
import { PATH } from "../../../n1-main/a1-ui/routes/Routes"
import { useFormik } from "formik"
import s from "./SignIn.module.css"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import { Button } from "@material-ui/core"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import Loading from "../../../n1-main/a1-ui/loading/Loading"

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
            dispatch(
                login({
                    email: values.email,
                    password: values.password,
                    rememberMe: values.rememberMe,
                })
            )
            formik.resetForm()
        },
    })
    if (isLogged) {
        return <Redirect to={PATH.PROFILE} />
    }

    return (
        <div>
            {isLogged ? (
                <Loading />
            ) : (
                <Container component="main" maxWidth="xs">
                    <div className={s.paper}>
                        <div className={s.avatarConatiner}>
                            <Avatar className={s.avatar}>
                                <AccountCircleIcon />
                            </Avatar>
                        </div>
                        <div className={s.typographyContainer}>
                            <Typography component="h1" variant="h5">
                                Sign In
                            </Typography>
                        </div>

                        <form onSubmit={formik.handleSubmit} className={s.form} noValidate>
                            <SuperInputText
                                placeholder={"Username or email"}
                                type={"email"}
                                {...formik.getFieldProps("email")}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            )}

                            <SuperInputText
                                placeholder={"Password"}
                                type={"password"}
                                {...formik.getFieldProps("password")}
                            />

                            {formik.touched.password && formik.errors.password && (
                                <div style={{ color: "red" }}>{formik.errors.password}</div>
                            )}

                            <SuperCheckbox
                                type={"rememberMe"}
                                {...formik.getFieldProps("rememberMe")}
                            />

                            <SuperButton type="submit"></SuperButton>

                            <Grid container>
                                <Grid item xs>
                                    <NavLink to={PATH.RENEWAL_PASS}>
                                        <Button fullWidth variant="outlined">
                                            <span>Forgot password</span>
                                        </Button>
                                    </NavLink>
                                    <NavLink to={PATH.SIGN_UP}>
                                        <Button fullWidth variant="outlined">
                                            Don't have an account? Sign Up
                                        </Button>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            )}
        </div>
    )
}
export default SignInWithFormik
