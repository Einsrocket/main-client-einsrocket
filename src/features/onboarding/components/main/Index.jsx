import  { useNavigate, useParams } from "react-router-dom";
import React, {useState} from 'react'
import {InstagramLogo, FacebookLogo, MapPin} from 'phosphor-react'
import Style from "./Style.module.css";

export const OnboardingContainer = ({onClose}) => {
    const {id} =  useParams();
    const navigate = useNavigate();
    const [tourIndex, setTourIndex] = useState(0);
    const [connectedButton, setConnectedButton] = useState(false);

    const navigateToDashboard = async () => {
        await updateMadeTutorial()
        navigate('/dashboard')
    };

    // cookies 
    var cookies = document.cookie.split(';')
        .map((cookie)=> cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    const incrementIndex = async () => {
        setTourIndex(tourIndex+1)
    };

    const updateMadeTutorial = () => {

        // object to be submited
        const valuesToSubmit = {
            id,
        };

        fetch(`${cookies?.__server}/users/update_made_tutorial`, {
            method: "POST",
            body: JSON.stringify(valuesToSubmit),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data)
            })
            .catch((err) => console.log(err));
    };


    return (
        <div className={Style.payment_Modal}>
            {
                tourIndex === 0 &&
                (
                    <>
                        <div data-aos="fade-down" className={Style.next_box}>
                            <h2><span>Quem é voce?</span></h2>
                            <p>O primeiro passo da jornada é sua biografia. Aqui voce pode apresentar um breve resumo sobre voce. Suas experiencias, interesses, objetivo, motivações e conquistas. Mostre para o mundo o que é reslevante para voce! Além disso voce tambem pode linkar suas redes sociais como instagram, facebook, e twitter para as pessoas te conhecerem ainda mais.</p>
                        <div  className={Style.next_buttons}>
                                <button onClick={incrementIndex}>PROXIMO</button>
                        </div>
                        </div>
                        <div data-aos="fade-down" className={Style.about_box}>
                            <h2>Sobre mim</h2>
                            <p>Entusiasta das melhores technologias de desenvolvimento web & Mobile.</p>
                            <p>Apaixonado por educação e mudar a vida das pessoas através do poder das technologias. Mais de 10.000 pessoas já tiveram contaco com algum dos meus treinamentos.</p>
                            <p>"Nada no mundo pode superar a persistencia. O talento não supera. Não há nada mais comum que talentosos fracassados. A genialidade não supera. O mundo está cheio de tolos educados. A persistencia e a determinação são muito poderosas."</p>

                            <div  className={Style.about_buttons}>
                                <a href='#'><FacebookLogo color='hsl(211, 25%, 84%)' size={30}/> FACEBOOK</a>
                                <a href='#'><InstagramLogo color='hsl(211, 25%, 84%)' size={30}/> INSTAGRAM</a>
                        </div>
                        </div>
                    </>
                )
            }   
            

            {
                tourIndex === 1
                 &&
                (
                    <>
                        <div data-aos="fade-down" className={Style.next_box}>
                            <h2><span>Informação une as pessoas</span></h2>
                            <p>Aqui é para voce mostrar o maximo de informação sobre voce. Os seus intereses, habilidades por desenvolver e o porque de estar estudando ingles.</p>
                        <div  className={Style.next_buttons}>
                                <button onClick={incrementIndex}>PROXIMO</button>
                        </div>
                        </div>
                        <div data-aos="fade-down" className={Style.about_box}>
                            <h2><span>Interesses</span></h2>
                            

                            <div  className={Style.about_interests}>
                                <span>PROGRAMAÇÃO</span>
                                <span>HACKING</span>
                                <span>INTELIGENCIAS ARITFICIAIS</span>
                                <span>EDUCAÇÃO</span>
                                <span>JAPONES</span>
                            </div>
                        </div>
                    </>
                )
            }   
            

            {
                tourIndex !== 0 && tourIndex !== 1
                 &&
                (
                    <>
                        <div data-aos="fade-down" className={Style.onboard_card}>
                            <img src='https://github.com/EufrasioJoao.png' alt='' />
                            <h2>Eufrasio João</h2>
                            <p>CEO | EASY LEARNING</p>
                            <p><MapPin color='hsl(211, 25%, 84%)' size={20}/> Nampula, Moçambique</p>
                            {
                                !connectedButton ? <button onClick={()=>setConnectedButton(true)}>+CONECTAR</button> 
                                :
                                <button className={Style.connected_button}>CONECTADO</button>
                            }

                            <div  className={Style.member_since}>
                                <p>MEMBRO DESDE: NOVEMBRO, 2022</p>
                            </div>
                        </div>
                        
                        <div data-aos="fade-down" className={Style.next_box}>
                            <h2><span>Seu cartão</span></h2>
                            <p>Este componente do perfil é a primeira coisa que as pessoas vão ver. Ele será apresentado todas as vezes que voce interagir com a comunidade na plataforma. Fique atento! Ele tem suas principais informações. Lembre-se de mante-lo sempre atualizado. É o seu aperto de mão.</p>
                            <div  className={Style.next_buttons}>
                                    <button onClick={navigateToDashboard}>PROXIMO</button>
                            </div>
                        </div>
                    </>
                )
            }   

        </div>
    );
};
