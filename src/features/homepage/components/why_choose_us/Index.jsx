import React from "react";
import style from "./styles.module.css";

export function WhyChoose() {
    return (
        <div className={style.why_choose}>
            <h1 data-aos="fade-top">Porque escolher a plataforma Easy Learning?</h1>
            <div className={style.why_choose_row} data-aos="fade-top">
                <div>
                    <span>Formação completa</span>
                    <p>Comece do zero e avance em direção às novas oportunidades por descobrir.</p>
                </div>
                <div>
                    <span>Programa de especialização</span>
                    <p>Especialize-se no ingles e veja as stacks e possibilidades que temos a oferecer.</p>
                </div>
                <div>
                    <span>Aulas avançadas</span>
                    <p>Esteja entre os melhores aprendendo mais a fundo e ganhe a fluencia de um nativo no idioma.</p>
                </div>
                <div>
                    <span>Exercicios e etapas</span>
                    <p>Voce vai receber exercicios para completar e passar de nivel, se destacando entre os outros usuarios.</p>
                </div>
                
                
            </div>
        </div>
    );
}
