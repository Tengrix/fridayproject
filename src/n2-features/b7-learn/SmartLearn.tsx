import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import { Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { useState } from "react"
import { CardsType } from "../../n1-main/a3-dal/mainAPI"
import {
    getCardsForCardsPack,
    getGradeTC,
    switchLearnMode,
} from "../../n1-main/a2-bll/store/cardsReducer"

type ShowAnswerModalType = {
    name: string
    disabled?: any
    grade: number
    packId: string
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

export default function SmartLearn(props: ShowAnswerModalType) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)

    const getCardsForLearn = () => {
        dispatch(switchLearnMode({ newValue: true }))
        dispatch(getCardsForCardsPack({ packID: props.packId }))
    }
    const learnModeOff = () => {
        dispatch(switchLearnMode({ newValue: false }))
        dispatch(getCardsForCardsPack({ packID: props.packId }))
    }
    const handleOpen = () => {
        setOpen(true)
        getCardsForLearn()
    }
    const handleClose = () => {
        setOpen(false)
        learnModeOff()
    }

    let cards = useSelector<AppRootStateType, CardsType[]>((state) => state.cards.cardsToLearn)
    const [numQA, setNumQA] = useState<number>(0)
    const [countA, setCountA] = useState<number>(1)
    const grade =["1", "2", "3", "4", "5"]
    const [show, setShow] = useState<boolean>(false)
    const [randomQ, setRandomQ] = useState<boolean>(false)
    const showAnswer = () => {
        setShow(!show)
    }

    let getAllQuestion:Array<any> = []
    let getAllRandomQuestion:Array<any> = []
    let getAllAnswers:Array<string|number> = []
    let getIdOfQuestion:Array<string> = []
    let out:Array<number> = [];
    cards.map((el) => (getAllQuestion.push([el.question]), getAllAnswers.push(el.answer),
        getIdOfQuestion.push(el._id), getAllRandomQuestion.push([el.question])) )
    cards.map((el,i)=>getAllQuestion[i].push(el.grade))
    for (let i = 0; i < getAllQuestion.length; ++i) {
        for (let j = 0; j < getAllQuestion[i][1]; ++j) {
            out.push(getAllQuestion[i][0]);
        }
    }
    const nextQuestion = () => {
        setNumQA(numQA + 1)
        setCountA(countA + 1)
        if (randomQ) {
            setNumQA(out[Math.floor(Math.random() * out.length)])
            console.log(out[Math.floor(Math.random() * out.length)])
            setCountA(countA + 1)
        }
    }
    const startAgain = () => {
        setRandomQ(true)
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
                <div>{randomQ?out[Math.floor(Math.random() * out.length)]: getAllRandomQuestion[numQA] }</div>
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
                    <Button
                        key={"grade-" + i}
                        onClick={() => newGradesForQuestions(i + 1, getIdOfQuestion[numQA])}
                    >
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
            <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={handleOpen}
                disabled={props.disabled}
            >
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