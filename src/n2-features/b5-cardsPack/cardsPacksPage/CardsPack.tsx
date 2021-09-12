import React from "react"
import {  initCardPacks } from "../../../n1-main/a3-dal/mainAPI"
import { NavLink } from "react-router-dom"
import { Button } from "@material-ui/core"

type ContainerCardsPackType = {
    cardsPack: initCardPacks
    delPack: (idPack: string) => void
    updateTitle: (newTitle: string, idPack: string) => void
    userId: string
}

const CardsPack = (props: ContainerCardsPackType) => {
    return (
        <tr>
            <td align="center">{props.cardsPack.name}</td>
            <td align="center">{props.cardsPack.cardsCount}</td>
            <td align="center">{props.cardsPack.created}</td>
            <td align="center">{props.cardsPack.updated}</td>
            <td align="center">
                <NavLink to={"/cards/" + props.cardsPack._id}>
                    <Button variant="outlined" color="primary" type="button">
                        Watch
                    </Button>
                </NavLink>
            </td>
        </tr>
    )
}
export default CardsPack
