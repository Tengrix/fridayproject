import Slider from "rc-slider/lib/Slider"
import Range from "rc-slider/lib/Range"
import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { SetPackCards } from "../../n1-main/a2-bll/store/cardsPackReducer"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import { initCardsPack, ResponseCardsType } from "../../n1-main/a3-dal/mainAPI"
import styles from "./Cards.module.css"

// type PacksType = {
//     _id: string
//     user_id: string
//     name: string
//     cardsCount: number
//     created: string
//     updateted: string
// }

const Packs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(SetPackCards())
    }, [])
    debugger
    const cardsPacksToMap = useSelector<AppRootStateType, Array<initCardsPack>>(
        (state) => state.cardsPacks.cardsPack
    )
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    // const packs: Array<PacksType> = [
    //     {
    //         _id: "1",
    //         user_id: "1",
    //         name: "no name",
    //         cardsCount: 25,
    //         created: "2021",
    //         updateted: "2021",
    //     },
    //     {
    //         _id: "2",
    //         user_id: "2",
    //         name: "no name",
    //         cardsCount: 25,
    //         created: "2021",
    //         updateted: "2021",
    //     },
    //     {
    //         _id: "3",
    //         user_id: "3",
    //         name: "no name",
    //         cardsCount: 25,
    //         created: "2021",
    //         updateted: "2021",
    //     },
    // ]
    if (!isLogged) {
        return <Redirect to={"/sign-in"} />
    }
    return (
        <div>
            <div>
                Search: <input placeholder="cards name" />
                <div>
                    <Slider />
                    <Range />
                </div>
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
                {cardsPacksToMap &&
                    cardsPacksToMap.map((c) => (
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
            </table>
            <div>1,2,3,4...5</div>
        </div>
    )
}

export default Packs
