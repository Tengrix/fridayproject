import React, { useCallback, useEffect } from "react"
import { initCardsPack } from "../../n1-main/a3-dal/mainAPI"
import { setNewCardsPack, SetPackCards } from "../../n1-main/a2-bll/store/cardsPackReducer"
import { useDispatch } from "react-redux"
import AddNewPack from "./AddNewPack"

type ContainerCardsPackType = {
    cardsPack: initCardsPack[]
    newCardPack: (title: string) => void
    delPack: (id: string) => void
}

const CardsPack = (props: ContainerCardsPackType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(SetPackCards())
    }, [])
    const removePack = () => {
        props.delPack("60e4c871ffb36b29e4aeeabb")
    }
    const newCardPack = useCallback(
        (title: string) => {
            dispatch(setNewCardsPack(title))
        },
        [dispatch]
    )
    return (
        <div>
            <AddNewPack newCardPack={newCardPack} />
            <button onClick={removePack}>del </button>
            <div>
                <div>
                    Search: <input placeholder="cards name" />
                    <input type="range" max="100" min="0" value="75" />
                    <input type="range" max="100" min="0" value="25" />
                    <button>Search</button>
                </div>
                <div>
                    {props.cardsPack.map((pack) => (
                        <div>{pack.name}</div>
                    ))}
                </div>
                {/* <table cellPadding="7" width="100%">
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
                    {props.cardsPack.map((c) => (
                        <tr key={c._id}>
                            <td align="center">{c.name}</td>
                            <td align="center">{c.cardsCount}</td>
                            <td align="center">{c.created}</td>
                            <td align="center">{c.updated}</td>
                            <td align="center">
                                <button>learn</button>
                                <button>update</button>
                                <button>delete</button>
                            </td>
                        </tr>
                    ))}
                </table> */}
                <div>1,2,3,4...5</div>
            </div>
        </div>
    )
}
export default CardsPack
