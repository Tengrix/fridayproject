type initStateType = {

}
let initState:initStateType = {

}

export const someReducer = (state:initStateType = initState,action:actionType) => {
    switch (action.type){
        case'some':{
            return state
        }
        default:{
            return state
        }
    }
}
export const someAC = () => {
    return{
        type:'some'
    }
}
type actionType = ReturnType<typeof someAC>