import React from "react";
import style from "./styles.module.css";

export function Connect() {
    return (
        <div className={style.connect}>
            <div className={style.connect_row}>
                <div className={style.connect_right} data-aos="fade-right">
                    <img src='\assets\images\astronauts.svg' alt='' />
                </div>
                <div className={style.connect_left} data-aos="fade-left">
                    <h2>Dezenas já se <span>conectaram</span>, só falta voce.</h2>
                    <p>Comece a avançar agora mesmo em direção aos seu objetivos e tenha fluencia em ingles.</p>
                    <a href='/signup'>COMEÇAR AGORA</a>
                </div>
                
            </div>
        </div>
    );
}
