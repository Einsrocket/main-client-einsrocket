import React from "react";
import style from "./styles.module.css";


export function StartNow() {
    return (
        <div className={style.start_now}>
            <h1 data-aos="fade-top" >Somos uma plataforma completa de aprendizado continuo em ingles</h1>
            <div className={style.start_now_row}  data-aos="fade-right" >
                <div className={style.start_now_left}>
                    <h2>Comece a aprender ingles do zero com a nossa ajuda</h2>
                    <p>Voce vai encontrar aulas para dominar o idioma, incluindo o sotaque americano ou britanico com a ajuda dos nossos professores, e muito mais.</p>
                    <a href='/signup'>QUERO CONHECER</a>
                </div>
                <div className={style.start_now_right}  data-aos="fade-left" >
                    <img src='\assets\images\dev.webp' alt='' />
                </div>
                
            </div>
        </div>
    );
}
