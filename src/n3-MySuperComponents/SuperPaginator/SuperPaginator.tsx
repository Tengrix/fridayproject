import React, { useState } from "react"
import styles from "./SuperPaginator.module.scss"

type PaginatorPropsType = {
    totalItemsCount: number
    currentPage: number
    pageSize: number
    portionSize: number
    currentPortion: number
    onClickToPage: (newCurrentPage: number, currentPortion: number) => void
}

const SuperPaginator = (props: PaginatorPropsType) => {
    let page = []
    const pageCount = Math.ceil(props.totalItemsCount / props.pageSize)
    for (let i = 1; i <= pageCount; i++) {
        page.push(i)
    }
    const portionCount = Math.ceil(pageCount / props.portionSize)
    const [portionNumber, setPortionNumber] = useState(props.currentPortion)
    const leftPortionNumber = (portionNumber - 1) * props.portionSize + 1
    const rightPortionNumber = portionNumber * props.portionSize

    return (
        <div className={styles.paginatorBody}>
            <button
                onClick={() => setPortionNumber(1)}
                disabled={portionNumber == 1}
                className={styles.buttons}
            >
                - -
            </button>
            <button
                onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}
                disabled={portionNumber == 1}
                className={styles.buttons}
            >
                -
            </button>

            {page
                .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) => {
                    const pageStyle = `${props.currentPage === p && styles.pageActive} ${
                        styles.numberPageStyle
                    }`
                    return (
                        <span key={p} onClick={() => props.onClickToPage(p, portionNumber)} className={pageStyle}>
                            {p}
                        </span>
                    )
                })}

            <button
                onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}
                disabled={portionCount <= portionNumber}
                className={styles.buttons}
            >
                +
            </button>
            <button
                onClick={() => setPortionNumber(portionCount)}
                disabled={portionCount <= portionNumber}
                className={styles.buttons}
            >
                ++
            </button>
        </div>
    )
}

export default SuperPaginator
