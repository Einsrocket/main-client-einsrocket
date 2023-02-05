import { useEffect, useState } from "react";
import { PaperPlaneTilt } from "phosphor-react";
import Swal from "sweetalert2";

import { Comment } from "../comment/Index";
import style from "./styles.module.css";

export function Comments({ id, lesson, areCommentsVisible, setLesson }) {
    const [commentList, setCommentList] = useState([]);
    var [input, setInput] = useState("");

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

    async function getComments() {
        let lessonId = await id;
        let server_url = cookies?.__server;

        await fetch(`${server_url}/lessons/get_by_id`, {
            method: "POST",
            body: JSON.stringify({ lesson_id: lessonId }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCommentList(data.result.reverse());
            })
            .catch((err) => console.log(err));
    }

    //handles comment adding
    const handleCommentAdding = async () => {
        if (input.trim() == "") {
            Swal.fire({
                title: "ALERTA!",
                text: "Insira algum conteudo para comentar",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        setLesson({
            ...lesson,
            comments: Number(lesson?.comments) + 1,
        });
        // values to submit when adding a comment
        const values = {
            author: cookies?.__username,
            lesson_id: id,
            description: input,
        };
        let server_url = cookies?.__server;

        input &&
            (await fetch(`${server_url}/lessons/add_comment/`, {
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
                .catch((err) => console.log(err)));

        /*refresh the comment list*/
        getComments();

        setInput("");
    };

    //#endregion

    useEffect(() => {
        getComments();
    }, []);

    return (
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
                    />
                    <button
                        onClick={() => {
                            handleCommentAdding();
                        }}
                    >
                        <PaperPlaneTilt color="hsl(214, 20%, 69%)" size={30} />
                    </button>
                </div>
            </div>

            <div className={style.post_comments}>
                {commentList &&
                    commentList.map((value) => {
                        return <Comment key={value.id} value={value} />;
                    })}
            </div>
        </div>
    );
}
