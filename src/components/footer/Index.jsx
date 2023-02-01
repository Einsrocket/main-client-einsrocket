import React from "react";
import { Phone, FacebookLogo, EnvelopeSimple } from "phosphor-react";
import style from "./styles.module.css";

export function Footer() {
    return (
        <footer className={style.footer}>
                <div  className={style.footer_logo_container}>
                    <img src="\Logo.jpg" alt="" />
                    <span>EINSROCKET<br/> 2022 All rights reserved</span>
                </div>
                
                <div  className={style.social_links_container}>
                    <a href="#">
                        <FacebookLogo color='rgba(157, 109, 235, 0.856)' size={40}/>
                    </a>
                    <a href="mailto:eufrasiojoao00@gmail.com">
                        <EnvelopeSimple color='rgba(157, 109, 235, 0.856)' size={40}/>
                    </a>
                    <a href="tel:+258865504448">
                        <Phone color='rgba(157, 109, 235, 0.856)' size={40}/>
                    </a>
                </div>
        </footer>
    );
}
