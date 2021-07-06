import React from "react"
import { signUpTC } from "../../../n1-main/a2-bll/store/mainAuthReducer"
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Button, TextField } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Redirect } from "react-router-dom"
import { PATH } from "../../../n1-main/a1-ui/routes/Routes"
import { useFormik } from "formik"
import s from "./SignIn.module.css"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
        <Container component="main" maxWidth="xs">
            <div className={s.paper}>
                <div className={s.avatarConatiner}>
                    <Avatar className={s.avatar}>
                        <AccountCircleIcon />
                    </Avatar>
                </div>
                <div className={s.typographyContainer}>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                </div>
                <form onSubmit={formik.handleSubmit} className={s.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        placeholder="Email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div style={{ color: "red" }}>{formik.errors.email}</div>
                    )}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        placeholder="Confirm password:"
                        name="confPass"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confPass}
                    />

                    {formik.errors.password && (
                        <div style={{ color: "red" }}>{formik.errors.password}</div>
                    )}

                    <Button fullWidth variant="contained" color="secondary">
                        Sign Up
                    </Button>

                    <div style={{ color: "red" }}>{commonError}</div>

                    <Grid container>
                        <Grid item xs>
                            <NavLink to={PATH.SIGN_IN}><Button fullWidth variant="outlined">Sign In</Button></NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
export default SignUp
