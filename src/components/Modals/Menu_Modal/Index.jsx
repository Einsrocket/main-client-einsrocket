import  { useNavigate} from "react-router-dom";
import { useState } from "react";
import { User, XCircle, Database, List } from "phosphor-react";
import Style from "./Style.module.css";

export const MenuModal = ({ userData }) => {
    const navigate = useNavigate();

    // submit values
    const logOutUser = async () => {
        document.cookie = "__loggedIn=false"
        navigate('/')
    };

    return (
        <div data-aos="fade-down" className={Style.Menu_Modal}>
            <div className={Style.Menu_Modal_account_links}>
                <a href='/dashboard'><List size={25} color='rgba(157, 109, 235, 0.856)'/> HOME</a>
                <a href='/profile'><User size={25} color='rgba(157, 109, 235, 0.856)'/> MEU PERFIL</a>
                <a href='/discover'><Database size={25} color='rgba(157, 109, 235, 0.856)'/> DISCOVER</a>
                <span onClick={logOutUser}><XCircle size={25} color='rgba(157, 109, 235, 0.856)'/> SAIR DA PLATFORMA</span>
            </div>
        </div>
    );
};
