import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import styles from "./Cards.module.css"

type PacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updateted: string
}

const Packs = () => {
    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)
    const packs: Array<PacksType> = [
        {
            _id: "1",
            user_id: "1",
            name: "no name",
            cardsCount: 25,
            created: "2021",
            updateted: "2021",
        },
        {
            _id: "2",
            user_id: "2",
            name: "no name",
            cardsCount: 25,
            created: "2021",
            updateted: "2021",
        },
        {
            _id: "3",
            user_id: "3",
            name: "no name",
            cardsCount: 25,
            created: "2021",
            updateted: "2021",
        },
    ]
    if (!isLogged) {
        return <Redirect to={"/sign-in"} />
    }
    return (
        <div>
            <div>
                Search: <input placeholder="cards name" />
                <input type="range" max="100" min="0" value="75" />
                <input type="range" max="100" min="0" value="25" />
                <button>Search</button>
            </div>
            <table cellPadding="7" width="100%" >
                <tr>
                    <th>Card name</th>
                    <th>
                        Cards count
                        <input type="button" value="Max"/>
                        <input type="button" value="Min"/>
                    </th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th>Control</th>
                </tr>
                {packs.map((c) => (
                    <tr key={c._id}>
                        <td align="center">{c.name}</td>
                        <td align="center">{c.cardsCount}</td>
                        <td align="center">{c.created}</td>
                        <td align="center">{c.updateted}</td>
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
