import React, {useCallback, useEffect} from "react";
import {initCardsPack} from "../../n1-main/a3-dal/mainAPI";
import {setNewCardsPack, SetPackCards} from "../../n1-main/a2-bll/store/cardsPackReducer";
import {useDispatch} from "react-redux";
import AddNewPack from "./AddNewPack";

type ContainerCardsPackType = {
    cardsPack:initCardsPack
    newCardPack:(title:string) => void;
    delPack:(id:string) => void;
}

const CardsPack = (props:ContainerCardsPackType) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(SetPackCards())
    },[])
    const removePack = () =>{
        props.delPack('60e4c871ffb36b29e4aeeabb')
    }
    const newCardPack = useCallback((title:string)=>{
        dispatch(setNewCardsPack(title))
    },[dispatch])
    return(
        <div>
            <AddNewPack newCardPack={newCardPack}/>
            <button onClick={removePack}>del </button>
        </div>
    )
}
export default CardsPack