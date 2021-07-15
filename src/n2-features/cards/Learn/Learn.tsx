import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getGradeTC} from "../../../n1-main/a2-bll/store/cardsGradeReducer";
import {AppRootStateType} from "../../../n1-main/a2-bll/store/store";

type LearnPageType = {
    question: string;
    answer:string;
    grades:string;
}

const LearnPage = () => {
    const grade = [1,2,3,4,5];
    let grades = useSelector<AppRootStateType,number>(state => state.cardsGrade.updatedGrade.grade)
    const [questions, setQuestion] = useState<any>([['What is React?',grade[4]],['What is Redux?',grade[4]],['What is promises?',grade[0]]
        ,['What is closure?',grade[0]], ['Functional or Class?',grade[0]]]);
    const [answers, setAnswers] = useState<string[]>(['React is a declarative, efficient, ' +
    'and flexible JavaScript library for building user interfaces. ' +
    'It lets you compose complex UIs from small and isolated pieces of code called “components”.',
        'Redux is a predictable state container designed to help you write JavaScript apps that behave ' +
        'consistently across client, server, and native environments and are easy to test.',
        'A Promise is a proxy for a value not necessarily known when the promise is created. It allows ' +
        'you to associate handlers with an asynchronous action\'s eventual success value or failure reason.',
        'A closure is the combination of a function bundled together (enclosed) with references to its surrounding ' +
        'state (the lexical environment).', 'FUNCTIONAL!'
    ]);
    const dispatch = useDispatch();

    let id = useSelector<AppRootStateType,string>(state => state.cardsGrade.updatedGrade.card_id)
    const [numQA, setNumQA] = useState<number>(0);
    const [numQ, setNumQ] = useState<number>(0);
    const [countA, setCountA] = useState<number>(1);
    let shots = useSelector<AppRootStateType, number>(state => state.cardsGrade.updatedGrade.shots)
    const [show, setShow] = useState<boolean>(false);
    const newGrades = (num:number) => {
        dispatch(getGradeTC(grades,id,shots))
    }
    const showAnswer = () =>{
        setShow(!show)
    }
    const nextQuestion = () =>{
        let temp = 0
        setNumQA(numQA+1)
        setCountA(countA+1)
        if(numQ===1){
            let sum = 0;
            for(let i = 0; i < questions.length; i++){
                sum += +questions[i][1];
            }
            let threshold = Math.random() * sum;
            let total = 0;
            for(let i = 0; i < questions.length; i++){
                total += +questions[i][1]
                if(total >= threshold){
                    temp = i;
                    break
                }else{
                    temp = questions.length-1
                }
            }  setNumQA(temp)
            setQuestion(questions)
        }

    }
    const startAgain = () => {
        setNumQ(1)
        setCountA(1)
    }
    const newGradesForQuestions = () => {

    }
    return(

        <div>
            <span>Question number: {countA}/5 {countA===5 && <button onClick={()=>{startAgain()}}>start again</button>}</span>
            <div>
                {questions[numQA]}
                {countA===5?<button disabled={true} onClick={() => {
                    startAgain()
                }}> next </button>:<button disabled={false} onClick={() => {
                    nextQuestion()
                }}> next </button>}
            </div>
            <div>
                <button disabled={false} onClick={showAnswer}>show answer</button>
            </div>
            <div>
                {show ? answers[numQA]:'' }
            </div>
            <div>
                {grade.map((el,i)=>(
                    <button key={'grade-' + i} onClick={()=> {
                        dispatch(getGradeTC(i, id, shots))
                    }}>{el}</button>
                ))}
            </div>
        </div>
    )
}
export default LearnPage