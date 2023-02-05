import { useEffect, useState } from "react";

import style from "./styles.module.css";

export function RightDiv({ id }) {
    const [lessonsList, setLessonsList] = useState([]);

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

    async function getLessons(course_name) {
        let trailName = await course_name;

        await fetch(`${cookies?.__server}/lessons/get/${trailName}`)
            .then((res) => res.json())
            .then((data) => {
                setLessonsList(data.result);
                // console.log(data.result);
            })
            .catch((err) => console.log(err));
    }

    async function getLesson() {
        let lessonId = await id;

        await fetch(`${cookies?.__server}/lessons/lesson/${lessonId}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.result);
                getLessons(data.result.course_name);
            })
            .catch((err) => console.log(err));
    }

    //#endregion

    useEffect(() => {
        getLesson();
    }, []);

    return (
        <div className={style.lesson_module_right}>
            <h4>{lessonsList[0]?.course_name}</h4>
            <div className={style.lesson_module_right_playlist}>
                {lessonsList &&
                    lessonsList.map((value) => {
                        return (
                            <a
                                key={value.id}
                                href={`/discover/lesson/${value.id}`}
                            >
                                <div
                                    className={
                                        style.lesson_module_right_playlist_lesson
                                    }
                                >
                                    <div>
                                        <span>
                                            {value?.lesson_number} -{" "}
                                            {value?.title}
                                        </span>
                                        <span>VIDEO</span>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
            </div>
        </div>
    );
}
