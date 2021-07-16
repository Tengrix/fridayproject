import {gradeAPI, gradeResponseType} from "../../a3-dal/GradeAPI";
import {Dispatch} from "redux";

type initialStateType = {
    updatedGrade:gradeResponseType
}
type ActionType = ReturnType<typeof getGradeAC>| ReturnType<typeof getShotsAC>

let initialState:initialStateType = {
    updatedGrade:{
        _id:'',
        cardsPack_id:'',
        card_id:'5eea471c77e2080004b2dd39',
        user_id:'',
        grade:5,
        shots:0
    }
}
export const gradeReducer = (state=initialState, action:ActionType) => {
    switch (action.type){
        case "GET-GRADE":
            return{...state, grade: action.grade, id:action.id}
        case "GET-SHOTS":
        default:
            return state
    }
}

const getGradeAC = (grade:number, id:string) => {
    return{
        type:'GET-GRADE',
        grade,id
    }as const
}
const getShotsAC = (shots:number) => {
    return{
        type:'GET-SHOTS',
        shots
    }as const
}
export const getGradeTC = (grade:number, card_id:string) =>  (dispatch:Dispatch) =>{
   gradeAPI.grades(grade, card_id).then((res)=>{
       dispatch(getGradeAC(res.data.grade, res.data.card_id))
   })
}





