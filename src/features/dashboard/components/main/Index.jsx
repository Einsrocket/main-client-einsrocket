import {useEffect,useState} from 'react'
import style from "./styles.module.css";

import { DashboardHeader } from "../../../../components/dashboard_header/Index";
import { TutorialModal } from "../tutorial_Modal/Index.jsx";


export function DashboarContainer() {
    // states 
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [username, setUsername] =  useState('')
    const [id, setId] =  useState()
    const [formatedUsername, setFormatedUsername] =  useState('')

    // cookies 
    var cookies = document.cookie.split(';')
        .map((cookie)=> cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});
    

    // function to get information of the user
    async function getUserInfo() {
        let user = await cookies?.__username;

        await fetch(`${cookies?.__server}/users/single/${user}`)
            .then(res=>res.json())
            .then(data=>{
                // console.log(data.result);
                setUsername(data.result.username);
                setId(data.result.id);
                
                if(data.result.made_tutorial === 'false'){
                    setIsModalVisible(true)
                }
            })
            .catch(err=>console.log(err))
        
    }

    async function getFormatedUsername() {
        let username = await cookies?.__username;
        let splitedUsername = await username.split('')

            for (let index = 0; index < splitedUsername.length; index++) {
                if(splitedUsername[index] === ' '){
                    let newSplitedUsername = username.split(' ');

                    setFormatedUsername(newSplitedUsername[0]);
                    break;
                }
            }
    }

    useEffect(()=>{
        getUserInfo()
        getFormatedUsername()
    }, [])


    return (
            <div className={style.dashboard}>
                <DashboardHeader />

                <div className={style.dashboard_welcome}>
                    <div>
                        <strong>Olá, {formatedUsername ? formatedUsername : username}</strong>
                        <p>Sua jornada rumo ao proximo nivel está apenas começando!</p>
                    </div>
                    <span>#NeverStopLearning</span>
                </div>

                <div className={style.dashboard_row}>
                    <div className={style.dashboard_left} >
                        <div className={style.dashboard_left_content}>
                            <span>{cookies?.__sigla}</span>
                            <div className={style.dashboard_left_view_profile}>
                                <small>Meu perfil</small>
                                <a href='/profile'>VISUALIZAR PERFIL</a>
                            </div>
                        </div>
                        <div className={style.dashboard_left_profile_level}>
                            <p>Nivel do perfil</p>
                            <div className={style.line}><div></div></div>
                        </div>
                        
                    </div>
                    <div className={style.dashboard_right}>
                        <img src='\assets\images\d8.png' alt=''/>
                    </div>
                </div>

                {isModalVisible && <TutorialModal
                    onClose={async ()=>{
                        await fetch(`${cookies?.__server}/users/update_made_tutorial`, {
                            method: "POST",
                            body: JSON.stringify({id: id}),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then((res) => res.json())
                            .then((data) => {
                            })
                            .catch((err) => console.log(err));

                        setIsModalVisible(false)
                    }}
                    id={id}
                />}
            </div>
    );
}
