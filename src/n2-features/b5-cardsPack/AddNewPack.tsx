import React, {ChangeEvent, useState} from 'react'
type addNewPackType = {
    newCardPack:(title:string) => void;
}
const AddNewPack = (props:addNewPackType) => {
    const [newTitle, setNewTitle] = useState<string>('')

    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setNewTitle(e.currentTarget.value)
    }
    const addPackHandler = () => {
        props.newCardPack(newTitle)
    }
    return(
        <div>
            <input type="text" value={newTitle} onChange={onChangeTitle}/>
            <button onClick={addPackHandler}> add </button>
        </div>
    )
}
export default AddNewPack