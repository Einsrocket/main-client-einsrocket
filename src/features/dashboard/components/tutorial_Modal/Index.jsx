import  { useNavigate } from "react-router-dom";
import React from "react";
import Style from "./Style.module.css";

export const TutorialModal = ({onClose, id}) => {
    const navigate = useNavigate();

    const navigateToOnboarding = async () => {
       navigate(`/onboarding/${id}`)
    };

    return (
        <div className={Style.payment_Modal}>
            <div data-aos="fade-down" className={Style.form}>
                <h1>Chegou a hora de darmos mais um passo rumo ao infinito!</h1>
                <p>Agora voce é oficialmente um booster! Vamos te ajudar a mostrar o seu potencial ao mundo, criar conexões com pessoas incriveis e, juntos, avançar para o proximo nivel.</p>
                <p>Preparamos este pequeno guia para que voce fique mais familiarizado com a nossa plataforma. Vamos lá?</p>
               
                <div className={Style.tutorial_buttons}>
                    <button onClick={onClose}>PULAR TOUR</button>
                    <button onClick={navigateToOnboarding}>FAZER TOUR</button>
                </div> 
                
            </div>
        </div>
    );
};
