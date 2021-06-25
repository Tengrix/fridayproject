import React from 'react'
import SuperButton from "../../../n3-MySuperComponents/SuperButton/SuperButton";
import styles from "./SignUp.module.css"

const SignUp = () => {
//Влад
    return(
        <div className={styles.inputBlock}>
            <input placeholder="email:"/>
            <input placeholder="password:"/>
            <input placeholder="confirm password:"/>
            <SuperButton/>     
        </div>
    )
}
export default SignUp