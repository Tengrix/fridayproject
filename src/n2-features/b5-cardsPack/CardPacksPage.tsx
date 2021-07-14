import { Checkbox } from "material-ui"
import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../n1-main/a1-ui/loading/Loading"
import {
    removeCardPack,
    setNewCardPack,
    getPackCards,
    updateCardPack,
    showMyCardsPacks,
    changeNewPageForShow,
} from "../../n1-main/a2-bll/store/cardPacksReducer"
import { AppRootStateType } from "../../n1-main/a2-bll/store/store"
import {
    cardsAPI,
    cardsPacksAPI,
    initCardPacks,
    ResponseGetCardPacksType,
} from "../../n1-main/a3-dal/mainAPI"
import SuperPaginator from "../../n3-MySuperComponents/SuperPaginator/SuperPaginator"
import CardsPack from "./CardsPack"

const CardPacksPage = () => {
    useEffect(() => {
        dispatch(getPackCards())
    }, [])
    const dispatch = useDispatch()
    const cardPacks = useSelector<AppRootStateType, initCardPacks[]>(
        (state) => state.cardPacks.cardPacks
    )

    const updateTitle = (newTitle: string, idPack: string) => {
        dispatch(updateCardPack({ idPack, newTitle }))
    }
    const newCardPack = useCallback(
        (newName: string) => {
            dispatch(setNewCardPack({ newName }))
        },
        [dispatch]
    )
    const delPack = (idPack: string) => {
        dispatch(removeCardPack({ idPack }))
    }
    const [nameCP, setNameCP] = useState("")
    const onChangeNameCP = (e: ChangeEvent<HTMLInputElement>) => {
        setNameCP(e.currentTarget.value)
    }
    const [checked, setChecked] = useState(false)
    const showMyCardPacks = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        setChecked(newIsDoneValue)
        dispatch(showMyCardsPacks({ isShow: newIsDoneValue }))
        dispatch(getPackCards())
    }

    const loadingProgress = useSelector<AppRootStateType, "loading" | "successed">(
        (state) => state.app.loadingProgress
    )
    const clickToPaginator = (newShowPage: number) => {
        dispatch(changeNewPageForShow({ newShowPage }))
        dispatch(getPackCards())
    }

    if (loadingProgress === "loading") return <Loading />
    return (
        <div>
            <div>
                Search: <input placeholder="cards name" />
                <input type="range" max="100" min="0" value="75" />
                <input type="range" max="100" min="0" value="25" />
                <button>Search</button>
                <input placeholder="Cards Pack name" onChange={onChangeNameCP} value={nameCP} />
                <button onClick={() => newCardPack(nameCP)}>Add CardsPack</button>
                <input type="checkbox" checked={checked} onChange={showMyCardPacks} />
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
                    <CardsPack
                        key={el._id}
                        cardsPack={el}
                        newCardPack={newCardPack}
                        delPack={delPack}
                        updateTitle={updateTitle}
                    />
                ))}
            </table>
            <SuperPaginator
                pageSize={10}
                totalItemsCount={100}
                currentPage={1}
                onClickToPage={clickToPaginator}
                portionSize={5}
            />
        </div>
    )
}
export default CardPacksPage
