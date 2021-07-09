import React, { useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setNewCardsPack} from "../../n1-main/a2-bll/store/cardsPackReducer";
import {AppRootStateType} from "../../n1-main/a2-bll/store/store";
import {initCardsPack, ResponseCardsType} from "../../n1-main/a3-dal/mainAPI";
import CardsPack from "./CardsPack";

const ContainerCardsPack = () => {
    const dispatch = useDispatch()
    const cardPack = useSelector<AppRootStateType,initCardsPack[]>(state => state.cardsPack.cardsPack)
    debugger
    const newCardPack = useCallback((title:string)=>{
        dispatch(setNewCardsPack(title))
    },[dispatch])

    return(
        <div>
            {cardPack.map((el)=>
                <CardsPack key={el._id}
                           cardsPack={el}
                           newCardPack={newCardPack}
                    />
            )}
        </div>
    )
}
export default ContainerCardsPack