type initState = {

}
let initState:initState = {

}

export const someReducer = (state:initState = initState,action:actionType) => {
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