import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    removeCardPackTC,
    setNewCardsPack,
    updateCardPack,
} from "../../n1-main/a2-bll/store/cardsPackReducer"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { initCardsPack, ResponseCardsType } from "../../n1-main/a3-dal/mainAPI"
import CardsPack from "./CardsPack"

const ContainerCardsPack = () => {
    const dispatch = useDispatch()
    const cardPacks = useSelector<AppRootStateType, initCardsPack[]>(
        (state) => state.cardsPack.cardPacks
    )
    const updateTitle = (newTitle: string, idPack: string) => {
        dispatch(updateCardPack(idPack, newTitle))
    }
    const newCardPack = useCallback(
        (title: string) => {
            dispatch(setNewCardsPack(title))
        },
        [dispatch]
    )
    const delPack = (idPack: string) => {
        dispatch(removeCardPackTC(idPack))
    }

    return (
        <div>
            <div>
                Search: <input placeholder="cards name" />
                <input type="range" max="100" min="0" value="75" />
                <input type="range" max="100" min="0" value="25" />
                <button>Search</button>
            </div>
            <table cellPadding="7" width="100%">
                <tr>
                    <th>Card name</th>
                    <th>
                        Cards count
                        <input type="button" value="Max" />
                        <input type="button" value="Min" />
                    </th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Control</th>
                </tr>
                {cardPacks.map((el) => (
                    <CardsPack
                        key={el._id}
                        cardsPack={el}
                        newCardPack={newCardPack}
                        delPack={delPack}
                        updateTitle={updateTitle}
                    />
                ))}
            </table>
        </div>
    )
}
export default ContainerCardsPack
