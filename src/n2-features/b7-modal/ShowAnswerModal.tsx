import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { Button, Checkbox, ListItem } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { useState } from "react"
import { getGradeTC } from "../../n1-main/a2-bll/store/cardsGradeReducer"
import { ListItemText } from "@material-ui/core"
import { CardsType } from "../../n1-main/a3-dal/mainAPI"

type ShowAnswerModalType = {
    name: string
}

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 500,
        backgroundColor: "lightpink",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

export default function ShowAnswerModal(props: ShowAnswerModalType) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)

    //   useEffect(() => {
    //     dispatch(updateGradeTc(4, "60abbfbd6a39d35b188ef6f2"))
    // }, [dispatch])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    // const [questions, setQuestion] = useState<any>([
    //     ["What is React?", 0],
    //     ["What is Redux?", 0],
    //     ["What is promises?", 0],
    //     ["What is closure?", 0],
    //     ["Functional or Class?", 0],
    // ])
    // const [answers, setAnswers] = useState<string[]>([
    //     "React is a declarative, efficient, " +
    //         "and flexible JavaScript library for building user interfaces. " +
    //         "It lets you compose complex UIs from small and isolated pieces of code called “components”.",
    //     "Redux is a predictable state container designed to help you write JavaScript apps that behave " +
    //         "consistently across client, server, and native environments and are easy to test.",
    //     "A Promise is a proxy for a value not necessarily known when the promise is created. It allows " +
    //         "you to associate handlers with an asynchronous action's eventual success value or failure reason.",
    //     "A closure is the combination of a function bundled together (enclosed) with references to its surrounding " +
    //         "state (the lexical environment).",
    //     "FUNCTIONAL!",
    // ])
    let cards = useSelector<AppRootStateType, CardsType[]>((state) => state.cards.cards)

    let id = useSelector<AppRootStateType, string>((state) => state.cardsGrade.updatedGrade.card_id)
    const [numQA, setNumQA] = useState<number>(0)
    const [numQ, setNumQ] = useState<number>(0)
    const [countA, setCountA] = useState<number>(1)
    const [grade, setGrade] = useState<string[]>(["1", "2", "3", "4", "5"])
    const [show, setShow] = useState<boolean>(false)
    const showAnswer = () => {
        setShow(!show)
    }
    const nextQuestion = () => {
        cards.map((el) => el.question + 1)
        setNumQA(numQA + 1)
        setCountA(countA + 1)
        if (numQ === 1) {
            // let sum = 0;
            // for(let i = 0; i < questions.length; i++){
            //     sum += +questions[i][1];
            // }
            // let threshold = Math.random() * sum;
            // let total = 0;
            // for(let i = 0; i < questions.length; i++){
            //     total += +questions[i][1]
            //     if(total >= threshold){
            //         return questions[i][0]
            //     }
            // }
            // return questions[questions.length-1]

            setNumQA(Math.floor(Math.random() * cards.length))
            setCountA(countA + 1)
        } else {
        }
        // setQuestion(questions[questions.length-1])
    }
    const startAgain = () => {
        setNumQ(1)
        setCountA(1)
    }
    const newGradesForQuestions = (i: number, id: string) => {
        dispatch(getGradeTC(i, id))
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Learn "Pack Name"</h2>
            <div id="simple-modal-description">
                <span>
                    Question number: {countA}/{cards.length}{" "}
                    {countA === cards.length && (
                        <Button
                            color="secondary"
                            variant={"outlined"}
                            onClick={() => {
                                startAgain()
                            }}
                        >
                            start again
                        </Button>
                    )}
                </span>
                <div>{cards.map((el) => el.question[numQA])}</div>
                <div>
                    <Button
                        color="primary"
                        variant={"outlined"}
                        disabled={false}
                        onClick={showAnswer}
                    >
                        show answer
                    </Button>
                </div>
                <div>{show ? cards.map((el) => el.answer[numQA]) : ""}</div>
            </div>
            <div>
                <h4>Rate Yourself</h4>
                {grade.map((el, i) => (
                    <Button key={"grade-" + i} onClick={() => newGradesForQuestions(i, id)}>
                        {el}
                    </Button>
                ))}
            </div>
            <Button color="secondary" variant="outlined" onClick={handleClose}>
                Cancel
            </Button>
            {countA === cards.length ? (
                <Button
                    color="primary"
                    variant={"outlined"}
                    disabled={true}
                    onClick={() => {
                        startAgain()
                    }}
                >
                    {" "}
                    Next{" "}
                </Button>
            ) : (
                <Button
                    color="primary"
                    variant={"outlined"}
                    disabled={false}
                    onClick={() => {
                        nextQuestion()
                    }}
                >
                    {" "}
                    Next{" "}
                </Button>
            )}
        </div>
    )
    return (
        <div>
            <Button variant="outlined" color="primary" type="button" onClick={handleOpen}>
                {props.name}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}
