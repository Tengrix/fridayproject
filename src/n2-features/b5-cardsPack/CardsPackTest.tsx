import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { CardsPackType, initCardsPack } from "../../n1-main/a3-dal/mainAPI"
import {
    removeCardPackTC,
    setNewCardsPack,
    SetPackCards,
    updateCardPack,
} from "../../n1-main/a2-bll/store/cardsPackReducer"
import { useDispatch } from "react-redux"
import AddNewPack from "./AddNewPack"
import SimpleModal from "../b7-modal/SimpleModal"

type ContainerCardsPackType = {
    cardsPack: initCardsPack
    newCardPack: (title: string, pack: CardsPackType) => void
    delPack: (idPack: string) => void
    updateTitle: (newTitle: string, idPack: string) => void
}

const CardsPackTest = (props: ContainerCardsPackType) => {
    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState<string>("")
    useEffect(() => {
        dispatch(SetPackCards())
    }, [])
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        <tr>
            <td align="center">{props.cardsPack.name}</td>
            <td align="center">{props.cardsPack.cardsCount}</td>
            <td align="center">{props.cardsPack.created}</td>
            <td align="center">{props.cardsPack.updated}</td>
            <td align="center">
                <SimpleModal name={"learn"}/>
                <button>update</button>
                <button>delete</button>
            </td>
        </tr>
    )
}
export default CardsPackTest


