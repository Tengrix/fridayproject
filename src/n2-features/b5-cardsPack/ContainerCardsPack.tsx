import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    removeCardPackTC,
    setNewCardsPack,
    SetPackCards,
} from "../../n1-main/a2-bll/store/cardsPackReducer"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { initCardsPack } from "../../n1-main/a3-dal/mainAPI"
import CardsPack from "./CardsPack"
import AddNewPack from "./AddNewPack"
import { useEffect } from "react"

const ContainerCardsPack = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(SetPackCards())
    }, [])
    let cardPack = useSelector<AppRootStateType, initCardsPack[]>(
        (state) => state.cardsPack.cardsPack
    )
    const newCardPack = useCallback(
        (title: string) => {
            dispatch(setNewCardsPack(title))
        },
        [dispatch]
    )
    const delPack = useCallback(
        (id: string) => {
            dispatch(removeCardPackTC(id))
        },
        [dispatch]
    )
    return (
        <div>
            <CardsPack cardsPack={cardPack} newCardPack={newCardPack} delPack={delPack} />
        </div>
    )
}
export default ContainerCardsPack
