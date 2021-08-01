import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../../n1-main/a1-ui/loading/Loading"
import {
    removeCardPack,
    getPackCards,
    updateCardPack,
    showMyCardsPacks,
    changeMaxMinCards,
    changeSort,
    initCardsPacksStateType,
    changeNewPageForShowPacks,
    changePortionPacks,
} from "../../../n1-main/a2-bll/store/cardPacksReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import SuperPaginator from "../../../n3-MySuperComponents/SuperPaginator/SuperPaginator"
import CardsPack from "./CardsPack"
import styles from "./CardsPacks.module.scss"
import CardsPacksControl from "./CardsPacksControl"

const CardPacksPage = () => {
    const dispatch = useDispatch()

    const cardPacksState = useSelector<AppRootStateType, initCardsPacksStateType>(
        (state) => state.cardPacks
    )

    const userId = useSelector<AppRootStateType, string>((state) => state.auth.user._id)

    const updateTitle = (newTitle: string, idPack: string) => {
        dispatch(updateCardPack({ idPack, newTitle }))
    }

    const delPack = (idPack: string) => {
        dispatch(removeCardPack({ idPack }))
    }

    const [checked, setChecked] = useState(cardPacksState.showMyCardsPacks)

    const showMyCardPacks = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        setChecked(newIsDoneValue)
        dispatch(showMyCardsPacks({ isShow: newIsDoneValue }))
        dispatch(getPackCards())
    }

    const changeMaxMinRange = (newValue: number[]) => {
        dispatch(changeMaxMinCards({ newValue }))
        dispatch(getPackCards())
    }

    const loadingProgress = useSelector<AppRootStateType, "loading" | "successed">(
        (state) => state.app.loadingProgress
    )

    const clickToPaginator = (newShowPage: number, currentPortion: number) => {
        dispatch(changeNewPageForShowPacks({ newShowPage }))
        dispatch(changePortionPacks({ currentPortion }))
        dispatch(getPackCards())
    }

    const changeSortCardsPacks = (
        newValue: "0updated" | "1updated" | "0cardsCount" | "1cardsCount"
    ) => {
        dispatch(changeSort({ newValue }))
        dispatch(getPackCards())
    }

    if (loadingProgress === "loading") return <Loading />

    return (
        <div className={styles.cardsPacksBlock}>
            <div className={styles.body}>
                <CardsPacksControl
                    cangeMaxMinRange={changeMaxMinRange}
                    showMyCardPacks={showMyCardPacks}
                    checked={checked}
                    maxCcount={cardPacksState.maxCardsCount}
                    minCCount={cardPacksState.minCardsCount}
                />
                <table cellPadding="7" width="100%">
                    <tr>
                        <th>Cards pack name</th>
                        <th>
                            Cards count
                            <input
                                type="button"
                                value="min"
                                onClick={() => changeSortCardsPacks("1cardsCount")}
                            />
                            <input
                                type="button"
                                value="max"
                                onClick={() => changeSortCardsPacks("0cardsCount")}
                            />
                        </th>
                        <th>
                            Created
                            <input
                                type="button"
                                value="Old"
                                onClick={() => changeSortCardsPacks("1updated")}
                            />
                            <input
                                type="button"
                                value="New"
                                onClick={() => changeSortCardsPacks("0updated")}
                            />
                        </th>
                        <th>Updated</th>
                        <th>Control</th>
                    </tr>
                    {cardPacksState.cardPacks.map((el) => (
                        <CardsPack
                            key={el._id}
                            cardsPack={el}
                            delPack={delPack}
                            updateTitle={updateTitle}
                            userId={userId}
                        />
                    ))}
                </table>
                <SuperPaginator
                    pageSize={10}
                    totalItemsCount={cardPacksState.cardPacksTotalCount}
                    currentPage={cardPacksState.page}
                    onClickToPage={clickToPaginator}
                    portionSize={5}
                    currentPortion={cardPacksState.currentPortionToPaginator}
                />
            </div>
        </div>
    )
}
export default CardPacksPage
