import React, { useState } from 'react'

type LearnPageType = {
    question: string;
    answer:string;
}
const question = ['What is React?','What is Redux?','What is promises?','What is closure?', 'Functional or Class?']
const answer = ['React is a declarative, efficient, ' +
                'and flexible JavaScript library for building user interfaces. ' +
                'It lets you compose complex UIs from small and isolated pieces of code called “components”.',
                'Redux is a predictable state container designed to help you write JavaScript apps that behave ' +
                'consistently across client, server, and native environments and are easy to test.',
                'A Promise is a proxy for a value not necessarily known when the promise is created. It allows ' +
                'you to associate handlers with an asynchronous action\'s eventual success value or failure reason.',
                'A closure is the combination of a function bundled together (enclosed) with references to its surrounding ' +
                'state (the lexical environment).', 'FUNCTIONAL!'

]
const LearnPage = () => {

    const [questions, setQuestion] = useState<string[]>(question);
    const [answers, setAnswers] = useState<string[]>(answer);
    const [rightAnswer, setRigthAnswer] = useState<number>(0);
    const [wrongAnswer, setWrongAnswer] = useState<number>(0);

    const startLearning = () => {
        setQuestion(questions)
    }

    return(

        <div>
            {<button onClick={startLearning}> start </button> && questions.map(el=>el)}
        </div>
    )
}
export default LearnPage