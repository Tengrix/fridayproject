import React, { useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeCardPackTC, setNewCardsPack} from "../../n1-main/a2-bll/store/cardsPackReducer";
import {AppRootStateType} from "../../n1-main/a2-bll/store/store";
import {initCardsPack} from "../../n1-main/a3-dal/mainAPI";
import CardsPack from "./CardsPack";
import AddNewPack from "./AddNewPack";

const ContainerCardsPack = () => {
    // const dispatch = useDispatch()
    // const cardPack = useSelector<AppRootStateType,any>(state => state.cardsPacks)
    // debugger
    // const newCardPack = useCallback((title:string)=>{
    //     dispatch(setNewCardsPack(title))
    // },[dispatch])
    // const delPack = useCallback((id:string)=>{
    //     dispatch(removeCardPackTC(id))
    // },[dispatch])
    // return(
    //     <div>
    //         {cardPack.map((el:any)=>
    //             <CardsPack key={el._id}
    //                        cardsPack={el}
    //                        newCardPack={newCardPack}
    //                        delPack={delPack}
    //                 />
    //         )}
    //     </div>
    // )
}
export default ContainerCardsPack