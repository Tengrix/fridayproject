import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {CardsPackType, initCardsPack} from "../../n1-main/a3-dal/mainAPI";
import {
    getAllCard,
    removeCardPackTC,
    setNewCardsPack,
    SetPackCards,
    updateCardPack
} from "../../n1-main/a2-bll/store/cardsPackReducer";
import {useDispatch, useSelector} from "react-redux";
import AddNewPack from "./AddNewPack";
import {AppRootStateType} from "../../n1-main/a2-bll/store/store";
import {current} from "@reduxjs/toolkit";

type ContainerCardsPackType = {
    cardsPack:initCardsPack
    newCardPack:(title:string,pack:CardsPackType) => void;
}

const CardsPack = (props:ContainerCardsPackType) => {
    const namePack = useSelector<AppRootStateType,initCardsPack[]>(state => state.pack.cardsPack)
    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState<string>('')
    useEffect(()=>{
        dispatch(SetPackCards())
    },[])
    useEffect(()=>{
        dispatch(getAllCard('5eb6a2f72f849402d46c6ac7'))
    },[])
    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const updateTitle = () => {
        dispatch(updateCardPack('60e786e0149b3c1a948051c5', newTitle))
    }
    const newCardPack = useCallback((title:string)=>{
        dispatch(setNewCardsPack(title))
    },[dispatch])
    const delPack = ()=>{
        dispatch(removeCardPackTC())
    }
    return(
        <div>
            <AddNewPack newCardPack={newCardPack}/>
            <input type="text" value={newTitle} onChange={onChangeTitle}/>
            <button onClick={updateTitle}>changeName</button>
            <div>
                <button onClick={delPack}>del </button>
            </div>
        </div>
    )
}
export default CardsPack