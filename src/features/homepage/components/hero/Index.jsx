import React from "react";
import style from "./styles.module.css";
import { Hand } from "phosphor-react";

import { Header } from "../../../../components/header/Index";

export function Hero() {
    return (
        <div className={style.hero_conatiner}>
            <Header />

            {/* CIRCLES  */}
            <div className={style.hero_circle_o}/>
            <div className={style.hero_circle_t}/>
            <div className={style.hero_circle_th}/>
            <div className={style.hero_circle_f}/>
            <div className={style.hero_circle_fi}/>
            <div className={style.hero_circle_s}/>
            <div className={style.hero_circle_se}/>

            {/* IMAGES */}
            <img alt='' src='\assets\images\me2.jpg' className={style.floating_img_o}/>
            <img alt='' src='\assets\images\student-5.png' className={style.floating_img_t}/>
            <img alt='' src='\assets\images\student-1.png' className={style.floating_img_th}/>
            <img alt='' src='\assets\images\student-2.png' className={style.floating_img_f}/>
            <img alt='' src='\assets\images\student-6.png' className={style.floating_img_s}/>

            
            <div  data-aos="fade-down" className={style.hero_content}>
                <span><Hand size={20} color='yellow' /> Hello World</span>
                <h1>Acelere e impulcione cada etapa do seu aprendizado em ENGLISH!</h1>
                <p>O mapa completo para guiar-te na evolução do seu aprendizado de ingles e acessar novas oportunidades na sua vida. Aprenda com a nossa ajuda e ganhe proficiencia  em ingles.</p>
                <a href="signin">EMBARCAR NO FOGUETE <small>&#10230;</small></a >
                
            </div>
        </div>
    );
}
