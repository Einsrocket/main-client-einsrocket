import {useEffect,useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {
    PaperPlaneTilt,
    HeartStraight,
    ChatCircleText,
} from "phosphor-react";

import {Comment} from "../comment/Index";
import { MenuModal } from "../../../../components/Modals/payment_Modal/Index.jsx";
import style from "./styles.module.css";


export function LessonContainer() {
    const {id} =  useParams()
    const navigate =  useNavigate()
    const [lesson, setLesson] =  useState([])
    const [lessonsList, setLessonsList] =  useState([])
    const [commentList, setCommentList] =  useState([])
    var [areCommentsVisible, setAreCommentsVisible] = useState(false);
    var [isLiked, setIsLiked] = useState(false);
    var [lessonLikes, setLessonLikes] = useState();
    var [lessonComments, setLessonComments] = useState();
    var [input, setInput] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showQuizButton, setShowQuizButton] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState([]);


    var cookies = document.cookie.split(';')
        .map((cookie)=> cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});


    async function getLessons(course_name) {
        let trailName = await course_name;

        await fetch(`${cookies?.__server}/lessons/get/${trailName}`)
            .then(res=>res.json())
            .then(data=>{
                setLessonsList(data.result);
            })
            .catch(err=>console.log(err))
        
    }

    
    async function getLesson() {
        let lessonId = await id;

        await fetch(`${cookies?.__server}/lessons/lesson/${lessonId}`)
            .then(res=>res.json())
            .then(data=>{
                setLesson(data.result);
                getLessons(data.result.course_name);
                setLessonLikes(data.result.likes);
                setLessonComments(data.result.comments);
            })
            .catch(err=>console.log(err))
    }


    async function getComments() {
        let lessonId = await id;
        let server_url = cookies?.__server

        await fetch(`${server_url}/lessons/get_by_id`, {
            method: 'POST',
            body: JSON.stringify({lesson_id: lessonId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(data=>{
                setCommentList(data.result.reverse())
            })
            .catch(err=>console.log(err))

            
    }


    async function checkIfLiked() {
        let lessonId = await id;
        let server_url = cookies?.__server

        await fetch(`${server_url}/lessons/check_like`, {
            method: 'POST',
            body: JSON.stringify({
                author: cookies?.__username,
                lesson_id: id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(data=>{
                if (data.like === true) {
                    setIsLiked(true);
                }
            })
            .catch(err=>console.log(err))
    }




    //handles comment adding
    const handleCommentAdding = async () => {
        // values to submit when adding a comment
        const values = {
            author: cookies?.__username,
            lesson_id: id,
            description: input,
        };
        let server_url = cookies?.__server
        
        
        input && await fetch(`${server_url}/lessons/add_comment/`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
            })
            .catch(err=>console.log(err))

       
            /*refresh the comment list*/
        getComments()
        
        setInput("");
    };



    //handles like adding
    const handleLikesAdding = async () => {
        //change the display of the likes
        if (isLiked) {
            setLessonLikes(lessonLikes - 1);
            setIsLiked(false);
        }
        if (!isLiked) {
            setLessonLikes(lessonLikes + 1);
            setIsLiked(true);
        }

        //values to submit when adding a like
        let values = {
            author: cookies?.__username,
            lesson_id: id,
        };
        let server_url = cookies?.__server

        await fetch(`${server_url}/lessons/add_like`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
            })
            .catch(err=>console.log(err))
    };


    async function check_if_user_is_allowed() {
        let user = await cookies?.__username;

        await fetch(`${cookies?.__server}/users/did_user_paid/${user}`)
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                setIsModalVisible(data.needToPay);
            })
            .catch(err=>console.log(err))
        
    }

    function navigateToQuiz() {
        navigate('/quiz', {state: {quiz: quizQuestions, lesson_id: Number(id), user_id: Number(cookies?.__userid), category: 'discover', author: cookies?.__username}})
    }

    function check_if_user_made_quiz() {
        fetch(`${cookies?.__server}/lessons/get_quizes`, {
            method: 'POST',
            body: JSON.stringify({author: cookies?.__username, lesson_id: Number(id), category: 'discover', user_id: Number(cookies?.__userid)}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                if(data?.madeQuiz === 'false'){
                    setQuizQuestions(JSON.parse(data.result[0]?.content));
                    setShowQuizButton(true)
                }
            })
            .catch(err=>console.log(err))
    }

    useEffect(()=>{
        getLesson()
        check_if_user_is_allowed()
        getComments()
        checkIfLiked()
        check_if_user_made_quiz()
    }, [])


    return (
        <div className={style.lesson}>
            <br/>
            {/* <h1>Discover - Trail</h1> */}
            
            { lesson.length !== 0 && 
                <div className={style.lesson_module}>
                    <div className={style.lesson_module_left}>
                        <video controls src={lesson?.video} onContextMenu={()=>{return false}}></video>
                        <h4>Aula {lesson?.lesson_number}  -  {lesson?.title}</h4>
                        
                        <div className={style.lesson_module_left_description_row}>
                            <p>{lesson?.description && lesson?.description.length > 360 ? lesson?.description.substring(0, 359)+"..." : lesson?.description}</p>

                            {showQuizButton && <button onClick={()=>{
                                navigateToQuiz()
                            }}>Fazer Quiz</button>}
                            
                        </div>

                        <div className={style.lesson_module_left_row}>
                            <img src={lesson?.teacher_avatar} alt='' />
                            <div>
                                <span>{lesson?.teacher}</span>
                                <span>{lesson?.teacher_ocupation}</span>
                            </div>
                        </div>


                        <div className={style.post_footer_likesrow_container}>
                            <div>
                                <span>
                                    <HeartStraight color="tomato" size={15} />
                                </span>
                                <span>
                                    <ChatCircleText color="rgba(84, 230, 140, 0.829)" size={15} />
                                </span>
                                <span style={{color: 'hsl(214, 20%, 69%)', fontSize: '12px'}}>{typeof(lesson?.likes) === 'number' && lessonLikes+lesson?.comments}</span>
                            </div>
                            <div>
                                <small>{lesson?.comments} Comentarios</small>
                                <small>{lessonLikes} Likes</small>
                            </div>
                        </div>





                        <div className={style.post_footer_row_container}>
                            <button 
                            onClick={() => handleLikesAdding()}
                            >
                                <HeartStraight
                                    color={isLiked ? "tomato" : "#747474"}
                                    size={30}
                                />{" "}
                                <span
                                    style={
                                        isLiked
                                            ? { color: "tomato" }
                                            : { color: "#747474" }
                                    }
                                >
                                    Gostei
                                </span>
                            </button>
                            <button
                                onClick={() => setAreCommentsVisible(!areCommentsVisible)}
                            >
                                <ChatCircleText color="rgba(84, 230, 140, 0.829)" size={30} />{" "}
                                <span style={{color: 'rgba(84, 230, 140, 0.829)'}}>Comentar</span>
                            </button>
                        </div>




                        <div
                        className={
                            areCommentsVisible
                                ? style.add_comments_container
                                : style.add_comments_container_none_display
                        }
                        >
                            <div className={style.add_comments}>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Adicionar comentario"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if(e.key === 'Enter'){
                                                input !== '' && handleCommentAdding()
                                            }

                                        }}
                                    />
                                    <button 
                                    onClick={() => handleCommentAdding()}
                                    >
                                        <PaperPlaneTilt color="hsl(214, 20%, 69%)" size={30} />
                                    </button>
                                </div>
                            </div>

                            <div className={style.post_comments}>
                                
                                {commentList &&
                                    commentList.map((value) => {
                                        return (
                                            <Comment key={value.id} value={value} />
                                        );
                                    })}
                            </div>
                        </div>


                        {/* csmmsdm */}







                    </div>
                    <div className={style.lesson_module_right}>
                        <h4>Cronograma das aulas</h4>
                        <div className={style.lesson_module_right_playlist}>
                            {
                                lessonsList && 
                                lessonsList.map((value)=>{
                                    return (
                                        <a key={value.id} href={`/discover/lesson/${value.id}`}>
                                            <div  className={style.lesson_module_right_playlist_lesson}>
                                                <div>
                                                    <span>AULA {value.lesson_number}</span>
                                                    <span>VIDEO</span>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })
                            }

                            
                        </div>
                    </div>
                </div>
            }

            {isModalVisible && <MenuModal />}
        </div>
    );
}
