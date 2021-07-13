import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { createCardsTC, deleteCardsTC, getCardsTC, updateCardsTc } from "../../../n1-main/a2-bll/store/cardsReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import { CardsType } from "../../../n1-main/a3-dal/mainAPI"
import SimpleModal from "../../b7-modal/SimpleModal"


const Cards = () => {
    const dispatch = useDispatch()

    const {cardsPack_id} = useParams<{cardsPack_id:string}>()

    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.cards.cards)
    
    console.log(cards);
    
    useEffect(() => {
        dispatch(getCardsTC("60abbfbd6a39d35b188ef6f2"))
    }, [])
    


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
                    <th><button onClick={()=>dispatch(createCardsTC(cardsPack_id))}>add card</button></th>
                </tr>
                {cards.map((c) => (
                   <tbody>
                        <tr>
                        <td align="center">{c.question}</td>
                        <td align="center">{c.answer}</td>
                        <td align="center">{c.grade}</td>
                        <td align="center">{c.updated}</td>
                        <td align="center">
                            <button onClick={()=>dispatch(updateCardsTc(c._id,c.cardsPack_id))}>update</button>
                            <button onClick={()=>dispatch(deleteCardsTC(c._id,c.cardsPack_id))}>del</button>
                        </td>
                    </tr>
                   </tbody>
                ))}
            </table>
            <div>1,2,3,4...5</div>
        </div>
    )
}
export default Cards
