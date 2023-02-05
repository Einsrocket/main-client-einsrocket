import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";

import { DiscoverCourse } from "../course/Index";
import { MenuModal } from "../../../../components/Modals/payment_Modal/Index.jsx";

export function DiscoverContainer() {
    const navigate = useNavigate();
    const [coursesList, setCoursesList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    async function getCoursesInfo() {
        await fetch(`${cookies?.__server}/courses/all`)
            .then((res) => res.json())
            .then((data) => {
                setCoursesList(data.result);
            })
            .catch((err) => console.log(err));
    }

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

    useEffect(() => {
        getCoursesInfo();
        check_if_user_is_allowed();
    }, []);

    return (
        <div className={style.discover}>
            <div className={style.discover_welcome}>
                <div>
                    <span className={style.discover_welcome_co}></span>
                    <span className={style.discover_welcome_ct}></span>
                    <strong>Discover</strong>
                    <p>Aprenda a falar ingles do zero!</p>
                </div>
                <span>#NeverStopLearning</span>
            </div>

            <div className={style.discover_start}>
                <div>
                    <strong>Inicie seus estudos</strong>
                    <p>
                        Jornada prática de introdução aos <br />
                        estudos para conhecer o universo da <br />
                        lingua inglesa.
                    </p>
                    <a href="/discover/trails/Conectar">INICIAR JORNADA</a>
                </div>
            </div>

            <div className={style.discover_column}>
                {coursesList &&
                    coursesList.map((value) => {
                        return <DiscoverCourse key={value.id} value={value} />;
                    })}
                {!coursesList &&
                    [1, 2].map((v) => {
                        return (
                            <div
                                className={style.discover_course_shimmer}
                            ></div>
                        );
                    })}
            </div>

            {isModalVisible && <MenuModal />}
        </div>
    );
}
