import React, { useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeCardPackTC, setNewCardsPack} from "../../n1-main/a2-bll/store/cardsPackReducer";
import {AppRootStateType} from "../../n1-main/a2-bll/store/store";
import CardsPack from "./CardsPack";
import {initCardsPack} from "../../n1-main/a3-dal/mainAPI";


const ContainerCardsPack = () => {
    const dispatch = useDispatch()
    const cardPack = useSelector<AppRootStateType,initCardsPack[]>(state => state.cardsPack.cardsPack)
    const newCardPack = useCallback((title:string)=>{
        dispatch(setNewCardsPack(title))
    },[dispatch])

    return(
        <div>
            {cardPack.map((el:any)=>
                <CardsPack key={el._id}
                           cardsPack={el}
                           newCardPack={newCardPack}
                    />
            )}
        </div>
    )
}
export default ContainerCardsPack