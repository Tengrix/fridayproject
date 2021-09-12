import React, { ChangeEvent } from "react"
import CreateCardsPack from "./CreateCardsPack"
import SearchPack from "./SearchPack"
import styles from "./CardsPacks.module.scss"

const CardsPacksControl = (props: {
    minCCount: number
    maxCcount: number
    cangeMaxMinRange: (newValue: number[]) => void;
    checked: boolean
    showMyCardPacks: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
    const [value, setValue] = React.useState<number[]>([props.minCCount, props.maxCcount])
    return (
        <div className={styles.searchBlock}>
            <SearchPack
                minCount={props.minCCount}
                maxCount={props.maxCcount}
                changeMaxMinRange={props.cangeMaxMinRange}
                setValue={setValue}
                value={value}
            />
            <CreateCardsPack />
            <div>
                <input type="checkbox" checked={props.checked} onChange={props.showMyCardPacks} />
                My cardPacks
            </div>
        </div>
    )
}

export default CardsPacksControl
