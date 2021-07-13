import { Checkbox } from "material-ui"
import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    removeCardPackTC,
    setNewCardsPack,
    SetPackCards,
    updateCardPack,
} from "../../n1-main/a2-bll/store/cardsPackReducer"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { initCardsPack } from "../../n1-main/a3-dal/mainAPI"
import CardsPack from "./CardsPack"
import CardsPackTest from "./CardsPackTest"

const CardPacksPage = () => {
    useEffect(() => {
        dispatch(SetPackCards())
    }, [])
    const dispatch = useDispatch()
    const cardPacks = useSelector<AppRootStateType, initCardsPack[]>(
        (state) => state.cardsPack.cardPacks
    )
    const idIsProfile = useSelector<AppRootStateType, string>((state) => state.auth.user.id)
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
    const [nameCP, setNameCP] = useState("")
    const onChangeNameCP = (e: ChangeEvent<HTMLInputElement>) => {
        setNameCP(e.currentTarget.value)
    }
    const showMyCardPacks = () => dispatch(SetPackCards)

    return (
        <div>
            <div>
                Search: <input placeholder="cards name" />
                <input type="range" max="100" min="0" value="75" />
                <input type="range" max="100" min="0" value="25" />
                <button>Search</button>
                <input placeholder="Cards Pack name" onChange={onChangeNameCP} value={nameCP} />
                <button onClick={() => newCardPack(nameCP)}>Add CardsPack</button>
                <input type="checkbox" onChange={showMyCardPacks} />
                My cardPacks
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
                    <CardsPackTest
                        key={el._id}
                        cardsPack={el}
                        newCardPack={newCardPack}
                        delPack={delPack}
                        updateTitle={updateTitle}
                    />
                ))}
            </table>
            <div>1,2,3,4...5</div>
        </div>
    )
}
export default CardPacksPage
