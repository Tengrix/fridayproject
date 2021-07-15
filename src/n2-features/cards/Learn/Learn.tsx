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
    const [questions, setQuestion] = useState<any>([['What is React?',0],['What is Redux?',0],['What is promises?',0]
        ,['What is closure?',0], ['Functional or Class?',0]]);
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
    let grades = useSelector<AppRootStateType,number>(state => state.cardsGrade.updatedGrade.grade)
    let id = useSelector<AppRootStateType,string>(state => state.cardsGrade.updatedGrade.card_id)
    const [numQA, setNumQA] = useState<number>(0);
    const [numQ, setNumQ] = useState<number>(0);
    const [countA, setCountA] = useState<number>(1);
    const [grade, setGrade] = useState<string[]>(['1','2','3','4','5']);
    const [show, setShow] = useState<boolean>(false);
    useEffect(()=>{
        dispatch(getGradeTC(grades,id))
    })
    const showAnswer = () =>{
        setShow(!show)
    }
    const nextQuestion = () =>{
        setNumQA(numQA+1)
        setCountA(countA+1)
        if(numQ===1){
            // let sum = 0;
            // for(let i = 0; i < questions.length; i++){
            //     sum += +questions[i][1];
            // }
            // let threshold = Math.random() * sum;
            // let total = 0;
            // for(let i = 0; i < questions.length; i++){
            //     total += +questions[i][1]
            //     if(total >= threshold){
            //         return questions[i][0]
            //     }
            // }
            // return questions[questions.length-1]

            setNumQA(Math.floor(Math.random()*questions.length))
            setCountA(countA+1)
        }else{
        }
            // setQuestion(questions[questions.length-1])
    }
    const startAgain = () => {
        setNumQ(1)
        setCountA(1)
    }
    const newGradesForQuestions = () => {}
    
    return(
        <div>
            <span>Question number: {countA}/5 {countA===5 && <button onClick={()=>{startAgain()}}>start again</button>}</span>
            <div>
                {/*{numQA}<br></br>*/}
                {questions[0+numQA]}
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
                {show ? answers[0+numQA]:'' }
            </div>
            <div>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
            </div>
        </div>
    )
}
export default LearnPage