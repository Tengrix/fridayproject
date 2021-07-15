import {gradeAPI, gradeResponseType} from "../../a3-dal/GradeAPI";
import {Dispatch} from "redux";

type initialStateType = {
    updatedGrade:gradeResponseType
}
type ActionType = ReturnType<typeof getGradeAC>

let initialState:initialStateType = {
    updatedGrade:{
        _id:'',
        cardsPack_id:'',
        card_id:'60e3022aa8b1610004c03ce1',
        user_id:'',
        grade:3,
        shots:0
    }
}
export const gradeReducer = (state=initialState, action:ActionType) => {
    switch (action.type){
        case "GET-GRADE":
            return{...state, card_id: action.card}
        default:
            return state
    }
}

const getGradeAC = (card:gradeResponseType) => {
    return{
        type:'GET-GRADE',
        card
    }as const
}
export const getGradeTC = (grade:number, card_id:string) =>  (dispatch:Dispatch) =>{
   gradeAPI.grades(grade, card_id).then((res)=>{
       dispatch(getGradeAC(res.data))
   })
}





