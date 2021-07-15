import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import Loading from "../../../n1-main/a1-ui/loading/Loading"
import { getCardsForCardsPack } from "../../../n1-main/a2-bll/store/cardsReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import { CardsType } from "../../../n1-main/a3-dal/mainAPI"

const Cards = () => {
    const {userID} = useParams<{userID: string}>()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCardsForCardsPack({userID}))
    }, [])
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    const loadingProgress = useSelector<AppRootStateType, "loading" | "successed">(
        (state) => state.app.loadingProgress
    )
    let cards = useSelector<AppRootStateType, CardsType[]>(
        (state) => state.cards.cards
    )
    if (!isLogged) {
        return <Redirect to={"/sign-in"} />
    }
    if (loadingProgress === "loading") return <Loading />
    return (
        <div>
            <table cellPadding="7" width="100%">
                <tr>
                    <th>Qustion</th>
                    <th>Answer</th>
                    <th>Grade</th>
                    <th>Created</th>
                    <th><button>add card</button></th>
                </tr>
                {cards.length && cards.map((c) => (
                    <tr>
                        <td align="center">{c.question}</td>
                        <td align="center">{c.answer}</td>
                        <td align="center">{c.grade}</td>
                        <td align="center">{c.created}</td>
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
