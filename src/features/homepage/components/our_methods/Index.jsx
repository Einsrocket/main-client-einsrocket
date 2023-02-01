import React from "react";
import style from "./styles.module.css";
import { UsersThree, TrendUp, Pen } from "phosphor-react";


export function OurMethods() {
    return (
        <div className={style.our_methods}>
            <h1 data-aos="fade-top">Metodo desenhado para<br/>acelerar sua evolução</h1>
            <div className={style.our_methods_row} data-aos="fade-top">
                <div>
                    <TrendUp color='rgba(157, 109, 235, 0.856)' size={40}/>
                    <span>Foco</span>
                    <p>O aprendizado de ingles é um grande objetivo, logo é necessario muito foco, nós vamos logo direto ao ponto no que realmente importa.</p>
                </div>
                <div>
                    <Pen color='rgba(157, 109, 235, 0.856)' size={40}/>
                    <span>Prática</span>
                    <p>Ingles é uma disciplina pratica, são as horas que voce passa sentado a praticar que vão te dar conhecimento e experiencia necessaria para dominar o idioma.</p>
                </div>
                <div>
                    <UsersThree color='rgba(157, 109, 235, 0.856)' size={40}/>
                    <span>Grupo</span>
                    <p>A conexão entre alunos impulsiona seu aprendizado, suas habilidades e sua rede de contactos. Além de ajudar a assimilar e fixar todo aprendizado.</p>
                </div>
            </div>
        </div>
    );
}
