import { Button, Modal } from "@material-ui/core"
import React, { useState } from "react"
import styles from "./SuperModal.module.scss"

type PropsType = {
    nameButton: string
    body: any
}

const SuperModal = (props: PropsType) => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Button variant="outlined" color="primary" type="button" onClick={() => setOpen(true)}>
                {props.nameButton}
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={styles.modal}>{props.body}</div>
            </Modal>
        </div>
    )
}

export default SuperModal
