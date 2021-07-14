import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { CardPackType, cardsAPI, cardsPacksAPI, initCardPacks } from "../../n1-main/a3-dal/mainAPI"
import {
    removeCardPack,
    setNewCardPack,
    getPackCards,
    updateCardPack,
} from "../../n1-main/a2-bll/store/cardPacksReducer"
import { useDispatch } from "react-redux"
import AddNewPack from "./AddNewPack"

type ContainerCardsPackType = {
    cardsPack: initCardPacks
    newCardPack: (title: string, pack: CardPackType) => void
    delPack: (idPack: string) => void
    updateTitle: (newTitle: string, idPack: string) => void
}

const CardsPack = (props: ContainerCardsPackType) => {
    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState<string>("")
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    // //
    // let balabala = []
    // cardsAPI.getCards(props.cardsPack._id).then(res=> {
    //     balabala = res.data.cards})
    // cardsPacksAPI.updateGrade("60ee184077f55e000491c760", 2).then( res => {
    // })
    // //

    return (
        <tr>
            <td align="center">{props.cardsPack.name}</td>
            <td align="center">{props.cardsPack.cardsCount}</td>
            <td align="center">{props.cardsPack.created}</td>
            <td align="center">{props.cardsPack.updated}</td>
            <td align="center">
                <button>learn</button>
                <button onClick={() => props.updateTitle(newTitle, props.cardsPack._id)}>
                    rename
                </button>
                <button onClick={() => props.delPack(props.cardsPack._id)}>delete</button>
            </td>
        </tr>
    )
}
export default CardsPack
