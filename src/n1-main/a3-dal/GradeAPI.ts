import axios from "axios";

const instance = axios.create({
    baseURL:'https://neko-back.herokuapp.com/2.0/',
    withCredentials:true
})

export const gradeAPI = {
    grades(grade:number, card_id:string){
        return instance.put<gradeResponseType>('cards/grade',{grade,card_id})
    }

}

export type gradeResponseType = {
    _id:string;
    cardsPack_id:string;
    card_id:string;
    user_id:string;
    grade:number;
    shots:number;
}