import React, { ChangeEvent, useState } from "react"
import { CardPackType, initCardPacks } from "../../../n1-main/a3-dal/mainAPI"
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom"

type ContainerCardsPackType = {
    cardsPack: initCardPacks
    delPack: (idPack: string) => void
    updateTitle: (newTitle: string, idPack: string) => void
    userId: string
}

const CardsPack = (props: ContainerCardsPackType) => {
    return (
        <tr>
            <NavLink to={"/cards/" + props.cardsPack._id}>
                <td align="center">{props.cardsPack.name}</td>
            </NavLink>
            <td align="center">{props.cardsPack.cardsCount}</td>
            <td align="center">{props.cardsPack.created}</td>
            <td align="center">{props.cardsPack.updated}</td>
            <td align="center">
                <button>learn</button>
                {props.userId === props.cardsPack.user_id && <button>rename</button>}
                {props.userId === props.cardsPack.user_id && (
                    <button onClick={() => props.delPack(props.cardsPack._id)}>delete</button>
                )}
            </td>
        </tr>
    )
}
export default CardsPack
