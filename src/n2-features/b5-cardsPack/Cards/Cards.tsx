import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useHistory, useParams } from "react-router-dom"
import Loading from "../../../n1-main/a1-ui/loading/Loading"
import { PATH } from "../../../n1-main/a1-ui/routes/Routes"
import {
    CardsInitialStateType,
    changeNewPageForShowCards,
    changePortionCards,
    deleteCard,
    getCardsForCardsPack,
} from "../../../n1-main/a2-bll/store/cardsReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import { initCardPacks } from "../../../n1-main/a3-dal/mainAPI"
import SuperPaginator from "../../../n3-MySuperComponents/SuperPaginator/SuperPaginator"
import Card from "./Card"
import styles from "./Cards.module.scss"
import CardsControl from "./CardsControl"

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

    const grade = useSelector<AppRootStateType, number>((state) => state.cards.updatedGrade.grade)

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

    const delCard = (idCard: string) => {
        const cardsPackId = packID
        dispatch(deleteCard({ idCard, cardsPackId }))
    }

    if (!isLogged) {
        return <Redirect to={PATH.SIGN_IN} />
    }

    if (deletedPack) {
        return <Redirect to={PATH.PACKS} />
    }

    if (loadingProgress === "loading" && !cardsState.learnMode) return <Loading />

    return (
        <div className={styles.cardsBlock}>
            <div className={styles.body}>
                <CardsControl
                    backToPreviousPage={backToPreviousPage}
                    packId={packID}
                    userId={userId}
                    packUserId={cardsState.packUserId}
                    namePack={NamePack ? NamePack : ""}
                    grade={grade}
                    disLearn={!cardsState.cards.length}
                />
                <table cellPadding="7" width="100%">
                    <tr>
                        <th>Qustion</th>
                        <th>Answer</th>
                        <th>Grade</th>
                        <th>Shots</th>
                        <th>Created</th>
                        <th>Updated</th>
                        {userId === cardsState.packUserId && <th>Control</th>}
                    </tr>
                    {cardsState.cards.length &&
                        cardsState.cards.map((c) => (
                            <Card
                                _id={c._id}
                                answer={c.answer}
                                question={c.question}
                                cardsPack_id={c.cardsPack_id}
                                created={c.created}
                                grade={c.grade}
                                updated={c.updated}
                                shots={c.shots}
                                userId={userId}
                                user_id={c.user_id}
                                packId={packID}
                                delCard={delCard}
                            />
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
