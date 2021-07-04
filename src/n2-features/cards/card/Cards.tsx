import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"

type CardsType ={
    answer: string,
    question: string,
    cardsPack_id: string,
    grade: number,
    shots: number,
    user_id: string,
    created: string,
    updated: string,
    _id: string,
}

const Cards = () => {
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    const cards: Array<CardsType> = [
        {
            answer: "fgdfgdgd efgdf df",
            question: "sgdsgg?",
            cardsPack_id: "no name",
            grade: 4.98,
            shots: 1,
            user_id: "1",
            created: "1",
            updated: "1",
            _id: "1",
        },
        {
            answer: "fgdfgdgd efgdf df",
            question: "sgdsgg?",
            cardsPack_id: "no name",
            grade: 4.98,
            shots: 1,
            user_id: "1",
            created: "1",
            updated: "1",
            _id: "2",
        },
        {
            answer: "fgdfgdgd efgdf df",
            question: "sgdsgg?",
            cardsPack_id: "no name",
            grade: 4.98,
            shots: 1,
            user_id: "1",
            created: "1",
            updated: "1",
            _id: "3",
        },
        
    ]
    if (!isLogged) {
        return <Redirect to={"/sign-in"} />
    }
    return (
        <div>
            <table cellPadding="7" width="100%">
                <tr>
                    <th>Qustion</th>
                    <th>Answer</th>
                    <th>Grade</th>
                    <th>Updated</th>
                    <th><button>add card</button></th>
                </tr>
                {cards.map((c) => (
                    <tr>
                        <td align="center">{c.question}</td>
                        <td align="center">{c.answer}</td>
                        <td align="center">{c.grade}</td>
                        <td align="center">{c.updated}</td>
                        <td align="center">
                            <button>show answer</button>
                        </td>
                    </tr>
                ))}
            </table>
            <div>1,2,3,4...5</div>
        </div>
    )
}
export default Cards
