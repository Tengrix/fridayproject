import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { Button, Checkbox, ListItem } from "@material-ui/core"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { useState } from "react"
import {CardsType, CardType} from "../../n1-main/a3-dal/mainAPI"
import {getGradeTC} from "../../n1-main/a2-bll/store/cardsReducer";

type ShowAnswerModalType = {
    name: string
    disabled?: any
    grade:number
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
    let cards = useSelector<AppRootStateType, CardsType[]>((state) => state.cards.cards)
    const [numQA, setNumQA] = useState<number>(0)
    const [numQ, setNumQ] = useState<number>(0)
    const [countA, setCountA] = useState<number>(1)
    const [grade, setGrade] = useState<string[]>(["1", "2", "3", "4", "5"])
    const [show, setShow] = useState<boolean>(false)
    const showAnswer = () => {
        setShow(!show)
    }
    let getAllQuestion:Array<string> = []
    let getAllAnswers:Array<string|number> = []
    let getIdOfQuestion:Array<string> = []
    cards.map((el) => getAllQuestion.push(el.question) )
    cards.map((el)=>getAllAnswers.push(el.answer))
    cards.map((el)=>getIdOfQuestion.push(el._id))
    const nextQuestion = () => {
        setNumQA(numQA + 1)
        setCountA(countA + 1)
        if (numQ === 1) {
            let temp = 0
            let sum = 0;
            for(let i = 0; i < getAllQuestion.length; i++){
                sum += props.grade;
            }
            let threshold = Math.random() * sum;
            let total = 0;
            for(let i = 0; i < getAllQuestion.length; i++){
                total += props.grade
                if(total >= threshold){
                    temp = props.grade
                }
            }
            setNumQA(temp)
            setCountA(countA + 1)
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
                <div>{getAllQuestion[numQA]}</div>
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
                <div>{show ? getAllAnswers[numQA] : ""}</div>
            </div>
            <div>
                <h4>Rate Yourself</h4>
                {grade.map((el, i) => (
                    <Button key={"grade-" + i} onClick={() => newGradesForQuestions(i+1, getIdOfQuestion[numQA])}>
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
            <Button variant="outlined" color="primary" type="button" onClick={handleOpen} disabled={props.disabled}>
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
