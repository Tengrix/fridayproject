import { Button } from "@material-ui/core"
import React from "react"
import SuperModal from "../../../n3-MySuperComponents/SuperModal/SuperModal"
import SmartLearn from "../../b7-learn/SmartLearn"
import CreateCard from "./CreateCard"
import DeleteCardPack from "./DeletePack"
import styles from "./Cards.module.scss"
import RenameCardPack from "./RenameCardPack"

const CardsControl = (props: {
    userId: string
    packUserId: string
    packId: string
    namePack: string
    disLearn: boolean
    grade: number
    backToPreviousPage: () => void
}) => (
    <div className={styles.controlBlock}>
        <div className={styles.namePack}>{props.namePack}</div>
        <div className={styles.buttonBlock}>
            {props.userId === props.packUserId && (
                <div className={styles.userControl}>
                    <SuperModal
                        nameButton="Delete pack"
                        body={<DeleteCardPack idPack={props.packId} />}
                    />
                    <SuperModal nameButton="Add card" body={<CreateCard packID={props.packId} />} />
                    <SuperModal
                        nameButton="Rename"
                        body={<RenameCardPack idPack={props.packId} namePack={props.namePack} />}
                    />
                </div>
            )}
            <SmartLearn
                grade={props.grade}
                name="learn"
                disabled={props.disLearn}
                packId={props.packId}
            />
            <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={props.backToPreviousPage}
            >
                Back
            </Button>
        </div>
    </div>
)

export default CardsControl
