import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    HeartStraight,
    ChatCircleText,
    Play,
    Pause,
    CornersOut,
} from "phosphor-react";

import { MenuModal } from "../../../../components/Modals/payment_Modal/Index.jsx";
import style from "./styles.module.css";
import VV from "./e.mp4";
import { RightDiv } from "../right_div/Index";
import { Comments } from "../comments/Index";

export function LessonContainer() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState([]);
    var [areCommentsVisible, setAreCommentsVisible] = useState(false);
    var [isLiked, setIsLiked] = useState(false);
    var [lessonLikes, setLessonLikes] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showQuizButton, setShowQuizButton] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState([]);

    const [playerState, setPlayerState] = useState({
        playing: false,
        percentage: 0,
        fullscreen: false,
    });
    const videoRef = useRef();

    async function toggleVideoPlay() {
        playerState.playing
            ? videoRef?.current?.pause()
            : videoRef?.current?.play();

        setPlayerState({
            ...playerState,
            playing: !playerState.playing,
        });
    }
    async function handleVideoTimeUpdate(e) {
        let currentPercentage =
            (videoRef.current.currentTime / videoRef.current.duration) * 100;

        setPlayerState({
            ...playerState,
            percentage: currentPercentage,
        });
    }
    async function handleChangeVideoPercentage(e) {
        let currentPercentage = e.target.value;

        videoRef.current.currentTime =
            (videoRef.current.duration / 100) * currentPercentage;

        setPlayerState({
            ...playerState,
            percentage: currentPercentage,
        });
    }
    async function handleChangeVideoFullscreen() {
        if (playerState.fullscreen === false) {
            videoRef.current.requestFullscreen();
        } else {
            if (videoRef.current.exitFullscreen) {
                videoRef.current.exitFullscreen();
            } else if (videoRef.current.webkitExitFullscreen) {
                /* Safari */
                videoRef.current.webkitExitFullscreen();
            } else if (videoRef.current.msExitFullscreen) {
                /* IE11 */
                videoRef.current.msExitFullscreen();
            }
        }

        setPlayerState({
            ...playerState,
            fullscreen: !playerState.fullscreen,
        });
    }

    //#region

    var cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce(
            (accumulator, [key, value]) => ({
                ...accumulator,
                [key.trim()]: decodeURIComponent(value),
            }),
            {}
        );

    async function getLesson() {
        let lessonId = await id;

        await fetch(`${cookies?.__server}/lessons/lesson/${lessonId}`)
            .then((res) => res.json())
            .then((data) => {
                setLesson(data.result);
                // console.log(data.result);
                setLessonLikes(data.result.likes);
            })
            .catch((err) => console.log(err));
    }

    async function checkIfLiked() {
        let lessonId = await id;
        let server_url = cookies?.__server;

        await fetch(`${server_url}/lessons/check_like`, {
            method: "POST",
            body: JSON.stringify({
                author: cookies?.__username,
                lesson_id: id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.like === true) {
                    setIsLiked(true);
                }
            })
            .catch((err) => console.log(err));
    }

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
        let server_url = cookies?.__server;

        await fetch(`${server_url}/lessons/add_like`, {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
            })
            .catch((err) => console.log(err));
    };

    async function check_if_user_is_allowed() {
        let user = await cookies?.__username;

        await fetch(`${cookies?.__server}/users/did_user_paid/${user}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setIsModalVisible(data.needToPay);
            })
            .catch((err) => console.log(err));
    }

    function navigateToQuiz() {
        navigate("/quiz", {
            state: {
                quiz: quizQuestions,
                lesson_id: Number(id),
                user_id: Number(cookies?.__userid),
                category: "discover",
                author: cookies?.__username,
            },
        });
    }

    function check_if_user_made_quiz() {
        fetch(`${cookies?.__server}/lessons/get_quizes`, {
            method: "POST",
            body: JSON.stringify({
                author: cookies?.__username,
                lesson_id: Number(id),
                category: "discover",
                user_id: Number(cookies?.__userid),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data?.madeQuiz === "false") {
                    setQuizQuestions(JSON.parse(data.result[0]?.content));
                    setShowQuizButton(true);
                }
            })
            .catch((err) => console.log(err));
    }

    //#endregion

    useEffect(() => {
        getLesson();
        check_if_user_is_allowed();
        checkIfLiked();
        check_if_user_made_quiz();
    }, []);

    return (
        <div className={style.lesson}>
            <br />
            {/* <h1>Discover - Trail</h1> */}

            {/* {lesson.length !== 0 && ( */}
            {1 !== 0 && (
                <div className={style.lesson_module}>
                    <div className={style.lesson_module_left}>
                        <div className={style.video_wrapper}>
                            <div>
                                <video
                                    ref={videoRef}
                                    src={VV}
                                    // src={lesson?.video}
                                    onTimeUpdate={() => {
                                        handleVideoTimeUpdate();
                                    }}
                                    onClick={() => {
                                        handleChangeVideoFullscreen();
                                    }}
                                ></video>
                                {!playerState.playing && (
                                    <button onClick={() => toggleVideoPlay()}>
                                        <Play
                                            color="rgb(255,255,255)"
                                            weight="fill"
                                            size={30}
                                        />
                                    </button>
                                )}
                            </div>
                            <div>
                                {playerState.playing && (
                                    <button onClick={() => toggleVideoPlay()}>
                                        <Pause
                                            color="rgb(255,255,255)"
                                            weight="fill"
                                            size={30}
                                        />
                                    </button>
                                )}
                                <input
                                    type="range"
                                    value={playerState.percentage}
                                    min="0"
                                    max="100"
                                    onChange={(e) => {
                                        handleChangeVideoPercentage(e);
                                    }}
                                />
                                <button
                                    onClick={() =>
                                        handleChangeVideoFullscreen()
                                    }
                                >
                                    <CornersOut
                                        color="rgb(255,255,255)"
                                        weight="fill"
                                        size={30}
                                    />
                                </button>
                            </div>
                        </div>
                        <h4>
                            {lesson?.lesson_number &&
                                `Aula ${lesson?.lesson_number} - ${lesson?.title}`}
                        </h4>

                        <div
                            className={style.lesson_module_left_description_row}
                        >
                            <p>
                                {lesson?.description &&
                                lesson?.description.length > 360
                                    ? lesson?.description.substring(0, 359) +
                                      "..."
                                    : lesson?.description}
                            </p>

                            {showQuizButton && (
                                <button
                                    onClick={() => {
                                        navigateToQuiz();
                                    }}
                                >
                                    Fazer Quiz
                                </button>
                            )}
                        </div>

                        <div className={style.lesson_module_left_row}>
                            <img src={lesson?.teacher_avatar} alt="" />
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
                                    <ChatCircleText
                                        color="rgba(84, 230, 140, 0.829)"
                                        size={15}
                                    />
                                </span>
                                <span
                                    style={{
                                        color: "hsl(214, 20%, 69%)",
                                        fontSize: "12px",
                                    }}
                                >
                                    {typeof lesson?.likes === "number" &&
                                        lessonLikes + lesson?.comments}
                                </span>
                            </div>

                            <div>
                                <small>{lesson?.comments} Comentarios </small>
                                <small style={{ marginLeft: 10 }}>
                                    {lessonLikes} Likes
                                </small>
                            </div>
                        </div>

                        <div className={style.post_footer_row_container}>
                            <button onClick={() => handleLikesAdding()}>
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
                                onClick={() =>
                                    setAreCommentsVisible(!areCommentsVisible)
                                }
                            >
                                <ChatCircleText
                                    color="rgba(84, 230, 140, 0.829)"
                                    size={30}
                                />{" "}
                                <span
                                    style={{
                                        color: "rgba(84, 230, 140, 0.829)",
                                    }}
                                >
                                    Comentar
                                </span>
                            </button>
                        </div>

                        <Comments
                            id={id}
                            lesson={lesson}
                            areCommentsVisible={areCommentsVisible}
                            setLesson={setLesson}
                        />
                    </div>

                    <RightDiv id={id} />
                </div>
            )}

            {isModalVisible && <MenuModal />}
        </div>
    );
}
