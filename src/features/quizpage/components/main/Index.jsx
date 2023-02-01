import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import style from "./styles.module.css";

import { DashboardHeader } from "../../../../components/dashboard_header/Index";

export function Main() {
    // states
    const navigate = useNavigate()
    const location = useLocation()
    const [Questions, setQuestions] = useState(location.state.quiz)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [wasQuestionCliqued, setWasQuestionCliqued] = useState(false)
    const [giveFeeadBack, setgiveFeeadBack] = useState(false)


    var cookies = document.cookie.split(';')
        .map((cookie)=> cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});


    // function that handles option click
    function handleOptionClick(isCorrect) {
        if(!wasQuestionCliqued){
            isCorrect && setScore(score+1) //if question was correct

            setgiveFeeadBack(true) //giving feedback to the user
        }

        setWasQuestionCliqued(true) //makes it so that the user cannot click again
    }


    // function that handles go to next question click
    function goToNextQuestion() {
        // if questions have not ended
        if(currentQuestion < Questions.length-1){
            setCurrentQuestion(currentQuestion+1)
            
            setgiveFeeadBack(false)
            setWasQuestionCliqued(false)
        }
        
        // if questions ended
        else{
            // concluding quiz
            fetch(`${cookies?.__server}/lessons/conclude_quiz`, {
            method: 'POST',
            body: JSON.stringify({
                author: location.state.author,
                 lesson_id: location.state.lesson_id,
                 category:location.state.category,
                 points: score,
                 user_id: location.state.user_id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                if(data?.succes === true){
                    setFinished(true)
                }
            })
            .catch(err=>console.log(err)) 
        }
    }


    // function that handles leaving the quiz page
    function leaveQuiz() {
        setCurrentQuestion(0)
        setgiveFeeadBack(false)
        setWasQuestionCliqued(false)
        setFinished(0)
        setScore(0)

        navigate('/dashboard')
    }



    


    return (
        <div className={style.quiz}>
            <DashboardHeader />
            
            {   
                // if user did not finished it will render this peace of code
                !finished ? Questions.length !== 0 &&
                <div className={style.quiz_parent_conatiner}>
                    <div className={style.quiz_conatiner}>
                        <div className={style.quiz_box_left}>
                            <h1>Questão {currentQuestion+1} de {Questions.length}</h1>
                            <p>Seus pontos: {score}</p>
                            <br/>
                            <p>{Questions[currentQuestion]?.questionsText}</p>
                        </div>

                        <div className={style.quiz_box_right}>
                            {
                                Questions[currentQuestion]?.answerOptions.map((value)=>{
                                    return (
                                        <div key={value.answerText} style={{background: giveFeeadBack && value.isCorrect ? 'violet' : 'none', border: giveFeeadBack && value.isCorrect && 'none', color: giveFeeadBack && value.isCorrect && 'white'}} onClick={()=>handleOptionClick(value.isCorrect)}>
                                            {value.answerText}
                                        </div>
                                    )
                                })
                            }

                            {giveFeeadBack && <button onClick={()=>goToNextQuestion()}>AVANÇAR</button>}
                        </div>
                    </div>
                </div>
                    
                    

                // if user finished it will render this peace of code
                :
                    <div className={style.finished}>
                        <div className={style.finished_box}>
                            <h1>Voce concluiu o quiz</h1>
                            <p>voce acertou <span style={{color: 'greenyellow'}}>{score}</span> perguntas</p>
                            <p>voce errou <span style={{color: 'red'}}>{Questions.length - score}</span> perguntas</p>

                            <button onClick={()=>leaveQuiz()}>Voltar</button>
                        </div>
                    </div>
            }
        </div>
    );
}
