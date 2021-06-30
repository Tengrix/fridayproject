import React from 'react'
import SuperInputText from "../../../n3-MySuperComponents/SuperInputText/SuperInputText";
import styles from "../../../utils/styles/CommonStylesForAuth.module.css"

const RenewalPass = () => {

    return(
        <div className={styles.authBlock}>
            <SuperInputText/>
            Renew your Pass
        </div>
    )
}
export default RenewalPass