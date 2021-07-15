import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../../../n1-main/a1-ui/loading/Loading"
import {
    removeCardPack,
    getPackCards,
    updateCardPack,
    showMyCardsPacks,
    changeNewPageForShow,
    changePortion,
    changeMaxMinCards,
    changeSort,
} from "../../../n1-main/a2-bll/store/cardPacksReducer"
import { AppRootStateType } from "../../../n1-main/a2-bll/store/store"
import { initCardPacks } from "../../../n1-main/a3-dal/mainAPI"
import SuperPaginator from "../../../n3-MySuperComponents/SuperPaginator/SuperPaginator"
import CardsPack from "./CardsPack"
import CreateCardsPack from "./CreateCardsPack"
import SearchPack from "./SearchPack"
import styles from "./CardsPacks.module.scss"

const CardPacksPage = () => {
    useEffect(() => {
        dispatch(getPackCards())
    }, [])
    const dispatch = useDispatch()
    const cardPacks = useSelector<AppRootStateType, initCardPacks[]>(
        (state) => state.cardPacks.cardPacks
    )
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(
        (state) => state.cardPacks.cardPacksTotalCount
    )
    const currentPage = useSelector<AppRootStateType, number>((state) => state.cardPacks.page)
    const currentPortion = useSelector<AppRootStateType, number>(
        (state) => state.cardPacks.currentPortionToPaginator
    )
    const minCountSearch = useSelector<AppRootStateType, number>(
        (state) => state.cardPacks.minCardsCount
    )
    const maxCountSearch = useSelector<AppRootStateType, number>(
        (state) => state.cardPacks.maxCardsCount
    )
    const userId = useSelector<AppRootStateType, string>(
        (state) => state.auth.user._id
    )

    const updateTitle = (newTitle: string, idPack: string) => {
        dispatch(updateCardPack({ idPack, newTitle }))
    }
    const delPack = (idPack: string) => {
        dispatch(removeCardPack({ idPack }))
    }
    const [checked, setChecked] = useState(false)
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
    const [value, setValue] = React.useState<number[]>([minCountSearch, maxCountSearch])
    const clickToPaginator = (newShowPage: number, currentPortion: number) => {
        dispatch(changeNewPageForShow({ newShowPage }))
        dispatch(changePortion({ currentPortion }))
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
                <div className={styles.searchBlock}>
                    <SearchPack
                        minCount={minCountSearch}
                        maxCount={maxCountSearch}
                        changeMaxMinRange={changeMaxMinRange}
                        setValue={setValue}
                        value={value}
                    />

                    <CreateCardsPack />
                    <div>
                        <input type="checkbox" checked={checked} onChange={showMyCardPacks} />
                        My cardPacks
                    </div>
                </div>
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
                    {cardPacks.map((el) => (
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
                    totalItemsCount={cardPacksTotalCount}
                    currentPage={currentPage}
                    onClickToPage={clickToPaginator}
                    portionSize={5}
                    currentPortion={currentPortion}
                />
            </div>
        </div>
    )
}
export default CardPacksPage
