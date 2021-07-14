import React from "react"

type PaginatorPropsType = {
    totalItemsCount: number
    currentPage: number
    pageSize: number
    onClickToPage: (newCurrentPage: number) => void
    portionSize: number
}

const SuperPaginator = (props: PaginatorPropsType) => {
    let page = []
    for (let i = 1; i <= props.pageSize; i++) {
        page.push(i)
    }
    return (
        <div>
            <div>
                <button>Back</button>
                {page.map((p) => {
                    return (
                        <span key={p} onClick={() => props.onClickToPage(p)}>
                            {p} 
                        </span>
                    )
                })}
                <button>Next</button>
            </div>
        </div>
    )
}

export default SuperPaginator
