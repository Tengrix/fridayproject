import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { Button, Checkbox, ListItem } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { useState } from "react"
import { getGradeTC } from "../../n1-main/a2-bll/store/cardsGradeReducer"
import {CardsType, CardType} from "../../n1-main/a3-dal/mainAPI";


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

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    let cardsQuestions = useSelector<AppRootStateType, CardsType[]>(
        (state) => state.cards.cards
    )
    let cardsAnswers = useSelector<AppRootStateType,CardsType[]>(state => state.cards.cards)

    let id = useSelector<AppRootStateType, string>(
        (state) => state.cardsGrade.updatedGrade.card_id
    )

    let grades = useSelector<AppRootStateType, number>(state => state.cardsGrade.updatedGrade.grade)
    const [numQA, setNumQA] = useState<number>(0)
    const [numQ, setNumQ] = useState<number>(0)
    const [countA, setCountA] = useState<number>(1)
    const grade=[1,2,3,4,5];
    const [show, setShow] = useState<boolean>(false)
    const showAnswer = () => {
        setShow(!show)
    }
    const nextQuestion = () => {
        setNumQA(numQA + 1)
        setCountA(countA + 1)

        if (numQ === 1) {
            // let tmp = 0
            // let sum = 0;
            // for(let i = 0; i < cardsQuestions.length; i++){
            //     sum += +cardsQuestions.map(el=>el.grade);
            // }
            // let threshold = Math.random() * sum;
            // let total = 0;
            // debugger
            // for(let i = 0; i < questions.length; i++){
            //     let num = +{...cardsQuestions.map(el => el.grade)}
            //     total.push(num)
            //     if(total.length >= threshold){
            //         tmp = +{...cardsQuestions.map(el => el.grade)
            //     };
            //     }
            // }
            setNumQA(Math.floor(Math.random() * cardsQuestions.length))
            setCountA(countA + 1)

        }
    }
    const startAgain = () => {
        setNumQ(1)
        setCountA(1)
    }
    const newGradesForQuestions = (grade: number, id: string) => {
        debugger
        dispatch(getGradeTC(grades, id))
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Learn "Pack Name"</h2>
            <div id="simple-modal-description">
                <span>
                    Question number: {countA}/{cardsQuestions.length}{" "}
                    {countA === cardsQuestions.length && (
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
                <div>{cardsQuestions.map(el=>el.question[numQA])}</div>
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
                <div>{show ? cardsAnswers.map((el)=>el.answer[numQA]) : ""}</div>
            </div>
            <div>
                <h4>Rate Yourself</h4>

                {grade.map((el, i) => (
                    <Button key={"grade-" + i} onClick={() => newGradesForQuestions(i,id)}>
                        {el}
                    </Button>
                ))}
            </div>
            <Button color="secondary" variant="outlined" onClick={handleClose}>
                Cancel
            </Button>
            {countA === cardsQuestions.length ? (
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