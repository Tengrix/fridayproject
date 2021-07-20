import { Button } from "@material-ui/core"
import { useFormik } from "formik"
import React from "react"
import { useDispatch } from "react-redux"
import { createCard } from "../../../n1-main/a2-bll/store/cardsReducer"

const CreateCard = (props: { packID: string }) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            question: "",
            answer: "",
        },
        onSubmit: (values) => {
            dispatch(
                createCard({
                    question: values.question,
                    answer: values.answer,
                    cardsPackId: props.packID,
                    grade: 3,
                })
            )
            formik.resetForm()
        },
    })

    return (
        <form
            onSubmit={formik.handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                height: "80%",
                width: "90%",
            }}
        >
            <textarea
                id="question"
                name="question"
                onChange={formik.handleChange}
                value={formik.values.question}
                placeholder="Question"
                style={{
                    height: "30%",
                }}
            />
            <textarea
                id="answer"
                name="answer"
                onChange={formik.handleChange}
                value={formik.values.answer}
                placeholder="Answer"
                style={{
                    height: "30%",
                }}
            />
            <Button variant="outlined" color="secondary" type="button" onClick={formik.submitForm}>
                Create
            </Button>
        </form>
    )
}

export default CreateCard
