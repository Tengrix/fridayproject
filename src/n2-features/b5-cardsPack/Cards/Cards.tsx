import { Button, Modal } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import Loading from "../../../n1-main/a1-ui/loading/Loading"
import { PATH } from "../../../n1-main/a1-ui/routes/Routes"
import { getPackCards, removeCardPack } from "../../../n1-main/a2-bll/store/cardPacksReducer"
import {
    CardsInitialStateType,
    changeNewPageForShowCards,
    changePortionCards,
    getCardsForCardsPack,
} from "../../../n1-main/a2-bll/store/cardsReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import { CardsType, initCardPacks } from "../../../n1-main/a3-dal/mainAPI"
import SuperModal from "../../../n3-MySuperComponents/SuperModal/SuperModal"
import SuperPaginator from "../../../n3-MySuperComponents/SuperPaginator/SuperPaginator"
import ShowAnswerModal from "../../b7-modal/ShowAnswerModal"
import styles from "./Cards.module.scss"

const Cards = () => {
    const { packID } = useParams<{ packID: string }>()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCardsForCardsPack({ packID }))
    }, [])

    const isLogged = useSelector<AppRootStateType, boolean>((state) => state.auth.isLogged)

    const userId = useSelector<AppRootStateType, string>((state) => state.auth.user._id)

    const loadingProgress = useSelector<AppRootStateType, "loading" | "successed">(
        (state) => state.app.loadingProgress
    )

    let cards = useSelector<AppRootStateType, CardsType[]>((state) => state.cards.cards)

    const cardsState = useSelector<AppRootStateType, CardsInitialStateType>((state) => state.cards)

    const NamePack = useSelector<AppRootStateType, initCardPacks | undefined>((state) =>
        state.cardPacks.cardPacks.find((p) => p._id === packID)
    )?.name

    const deletedPack = useSelector<AppRootStateType, boolean>(
        (state) => state.cardPacks.packDeleted
    )

    const clickToPaginator = (newShowPage: number, currentPortion: number) => {
        dispatch(changeNewPageForShowCards({ newShowPage }))
        dispatch(changePortionCards({ currentPortion }))
        dispatch(getCardsForCardsPack({ packID }))
    }

    const history = useHistory()

    const backToPreviousPage = () => {
        history.push(PATH.PACKS)
    }

    const delPack = () => {
        const idPack = packID
        dispatch(removeCardPack({ idPack }))
    }

    if (!isLogged) {
        return <Redirect to={PATH.SIGN_IN} />
    }

    if (deletedPack) {
        return <Redirect to={PATH.PACKS} />
    }

    if (loadingProgress === "loading") return <Loading />
    const bodyAddCard = (
        <div>
            <input />
            <input />
            <button>Create</button>
        </div>
    )
    return (
        <div className={styles.cardsBlock}>
            <div className={styles.body}>
                <div className={styles.controlBlock}>
                    <div className={styles.namePack}>{NamePack}</div>
                    <div className={styles.buttonBlock}>
                        {userId === cardsState.packUserId && (
                            <div className={styles.userControl}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    type="button"
                                    onClick={delPack}
                                >
                                    Delete pack
                                </Button>

                                <SuperModal nameButton="Add card" body={bodyAddCard} />
                                <SuperModal nameButton="Rename" body={<div>Hello</div>} />
                            </div>
                        )}
                        <ShowAnswerModal name="learn" disabled={!cards.length} />
                        <Button
                            variant="outlined"
                            color="primary"
                            type="button"
                            onClick={backToPreviousPage}
                        >
                            Back
                        </Button>
                    </div>
                </div>
                <table cellPadding="7" width="100%">
                    <tr>
                        <th>Qustion</th>
                        <th>Answer</th>
                        <th>Grade</th>
                        <th>Shots</th>
                        <th>Created</th>
                        <th>Updated</th>
                    </tr>
                    {cards.length &&
                        cards.map((c) => (
                            <tr>
                                <td align="center">{c.question}</td>
                                <td align="center">
                                <SuperModal nameButton="Show answer" body={c.answer} />
                                </td>
                                <td align="center">{c.grade}</td>
                                <td align="center">{c.shots}</td>
                                <td align="center">{c.created}</td>
                                <td align="center">{c.updated}</td>
                            </tr>
                        ))}
                </table>
                <SuperPaginator
                    currentPage={cardsState.page}
                    pageSize={cardsState.pageCount}
                    portionSize={5}
                    currentPortion={cardsState.currentPortionToPaginator}
                    totalItemsCount={cardsState.cardsTotalCount}
                    onClickToPage={clickToPaginator}
                />
            </div>
        </div>
    )
}
export default Cards
