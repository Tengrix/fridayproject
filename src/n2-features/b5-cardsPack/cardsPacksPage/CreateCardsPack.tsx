import { useFormik } from "formik"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { createCardPack } from "../../../n1-main/a2-bll/store/cardPacksReducer"
import SuperModal from "../../../n3-MySuperComponents/SuperModal/SuperModal"

const CreateCardsPack = () => {
    const dispatch = useDispatch()
    const newCardPack = useCallback(
        (newName: string) => {
            dispatch(createCardPack({ newName }))
        },
        [dispatch]
    )
    const formik = useFormik({
        initialValues: {
            NameNewCardsPack: "",
        },
        onSubmit: (values) => {
            newCardPack(values.NameNewCardsPack)
        },
    })
    return (
        <SuperModal
            nameButton="Create card pack"
            body={
                <form onSubmit={formik.handleSubmit}>
                    <input
                        id="NameNewCardsPack"
                        name="NameNewCardsPack"
                        placeholder="Name new pack"
                        onChange={formik.handleChange}
                        value={formik.values.NameNewCardsPack}
                    />
                    <button>Create</button>
                </form>
            }
        />
    )
}

export default CreateCardsPack
