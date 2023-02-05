import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuModal } from "../Modals/Menu_Modal/Index.jsx";
import { List, User, XCircle } from "phosphor-react";

import style from "./styles.module.css";

export function DashboardHeader() {
    const navigate = useNavigate();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
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

    // submit values
    const logOutUser = async () => {
        document.cookie = "__loggedIn=false";
        navigate("/");
    };

    return (
        <header className={style.main_header}>
            <nav>
                <div className={style.logo_container}>
                    <img src="icon.png" alt=""></img>
                    <span>EINSROCKET</span>
                    {!isMenuVisible ? (
                        <button onClick={() => setIsMenuVisible(true)}>
                            <List color="rgba(157, 109, 235, 1)" size={35} />
                        </button>
                    ) : (
                        <button onClick={() => setIsMenuVisible(false)}>
                            <XCircle color="rgba(157, 109, 235, 1)" size={35} />
                        </button>
                    )}
                </div>

                <div className={style.auth_links}>
                    <a href="/dashboard">HOME</a>
                    <a href="/discover">DISCOVER</a>
                    <div onClick={() => setIsModalVisible(!isModalVisible)}>
                        {cookies?.__sigla && cookies?.__sigla.toUpperCase()}
                    </div>
                    <a href="profile" className={style.profile_link}>
                        {cookies?.__sigla && cookies?.__sigla.toUpperCase()}
                    </a>
                </div>
                {isMenuVisible && (
                    <div className={style.mobile_auth_links}>
                        <a href="/dashboard">HOME</a>
                        <a href="/discover">DISCOVER</a>
                        <a href="#" onClick={logOutUser}>
                            {" "}
                            SAIR DA PLATFORMA
                        </a>
                    </div>
                )}
            </nav>

            {isModalVisible && <MenuModal />}
        </header>
    );
}
