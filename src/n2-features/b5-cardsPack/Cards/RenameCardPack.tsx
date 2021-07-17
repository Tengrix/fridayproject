import { Button } from "@material-ui/core"
import { useFormik } from "formik"
import React from "react"
import { useDispatch } from "react-redux"
import { updateCardPack } from "../../../n1-main/a2-bll/store/cardPacksReducer"

const RenameCardPack = (props: { idPack: string; namePack?: string }) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            newNameCardsPack: props.namePack ? props.namePack : "",
        },
        onSubmit: (values) => {
            dispatch(updateCardPack({ idPack: props.idPack, newTitle: values.newNameCardsPack }))
        },
    })
    return (
        <form
            onSubmit={formik.handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "60%",
                width: "50%",
            }}
        >
            <input
                id="newNameCardsPack"
                name="newNameCardsPack"
                placeholder="New name"
                onChange={formik.handleChange}
                value={formik.values.newNameCardsPack}
                style={{
                    height: "15%",
                }}
            />
            <Button variant="outlined" color="secondary" type="button" onClick={formik.submitForm}>
                Rename
            </Button>
        </form>
    )
}

export default RenameCardPack
