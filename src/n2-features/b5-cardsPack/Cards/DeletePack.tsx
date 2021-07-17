import { Button } from "@material-ui/core"
import React from "react"
import { useDispatch } from "react-redux"
import { removeCardPack } from "../../../n1-main/a2-bll/store/cardPacksReducer"

const DeleteCardPack = (props: { idPack: string }) => {
    const dispatch = useDispatch()
    const delPack = () => {
        const idPack = props.idPack
        dispatch(removeCardPack({ idPack }))
    }
    return (
        <div
            style={{
                height: "60%",
                width: "60%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
            }}
        >
            <div>Do you sure?</div>
            <Button variant="outlined" color="secondary" type="button" onClick={delPack}>
                Delete pack!
            </Button>
        </div>
    )
}

export default DeleteCardPack
