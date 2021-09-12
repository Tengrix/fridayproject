import { Button } from "@material-ui/core"
import React from "react"
import { CardsType } from "../../../n1-main/a3-dal/mainAPI"
import SuperModal from "../../../n3-MySuperComponents/SuperModal/SuperModal"
import UpdateCard from "./UpdateCard"

const Card = (props: CardsType & { userId: string; packId: string; delCard: (id: string) => void }) => {
    return (
        <tr>
            <td align="center">{props.question}</td>
            <td align="center">
                <SuperModal nameButton="Show answer" body={props.answer} />
            </td>
            <td align="center">{props.grade}</td>
            <td align="center">{props.shots}</td>
            <td align="center">{props.created}</td>
            <td align="center">{props.updated}</td>
            {props.userId === props.packId && (
                <td align="center">
                    <Button
                        variant="outlined"
                        color="primary"
                        type="button"
                        onClick={() => props.delCard(props._id)}
                    >
                        Delete
                    </Button>
                    <SuperModal
                        nameButton="Update"
                        body={
                            <UpdateCard
                                answer={props.answer}
                                question={props.question}
                                idCard={props._id}
                                idPack={props.packId}
                            />
                        }
                    />
                </td>
            )}
        </tr>
    )
}

export default Card
