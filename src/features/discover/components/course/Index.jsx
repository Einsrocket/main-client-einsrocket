import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";

import { DashboardHeader } from "../../../../components/dashboard_header/Index";

export function DiscoverCourse({ value }) {
    const navigate = useNavigate();
    
    

    return (
        <div
            onClick={() => navigate(`/discover/trails/${value.title}`)}
            className={style.discover_course}
        >
            <div className={style.discover_course_left}>
                <div className={style.discover_course_left_row}>
                    <img src={value.avatar}></img>
                    <div>
                        <span>{value.title}</span>
                        <p>{value.first_description}</p>
                    </div>
                </div>
            </div>
            <div className={style.discover_course_right}>
                <p>{value.second_description}</p>

                <div className={style.discover_course_right_topics}>
                    <p>{value.first_topic}</p>
                    <p>{value.second_topic}</p>
                    <p>{value.third_topic}</p>
                </div>
            </div>
        </div>
    );
}
