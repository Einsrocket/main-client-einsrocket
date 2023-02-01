import {useEffect,useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import style from "./styles.module.css";
import { MenuModal } from "../../../../components/Modals/payment_Modal/Index.jsx";

export function TrailContainer() {
    const navigate =  useNavigate()
    const {trail} =  useParams()
    const [lessonsList, setLessonsList] =  useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);

    var cookies = document.cookie.split(';')
        .map((cookie)=> cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    async function getTrails() {
        let trailName = await trail;

        await fetch(`${cookies?.__server}/lessons/get/${trailName}`)
            .then(res=>res.json())
            .then(data=>{
                setLessonsList(data.result);
            })
            .catch(err=>console.log(err))
    }

    
    async function check_if_user_is_allowed() {
        let user = await cookies?.__username

        await fetch(`${cookies?.__server}/users/did_user_paid/${user}`)
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                setIsModalVisible(data.needToPay);
            })
            .catch(err=>console.log(err))
        
    }

    useEffect(()=>{
        getTrails()
        check_if_user_is_allowed()
    }, [])

    return (
        <div className={style.trail}>
            <div className={style.trail_module}>
                <span>Módulo {trail}</span>
                <p>As aulas estão ordenadas de acordo com a jornada ideal, comece pela primeira aula e não pule etapas.</p>
            </div>
            
            <div className={style.trail_column}>
                {
                    lessonsList && 
                    lessonsList.map((value)=>{
                        return (
                            <div key={value.id} onClick={()=>navigate(`/discover/lesson/${value.id}`)} className={style.trail_lesson}>
                                <div className={style.trail_lesson_left}><span>{value.lesson_number}</span></div>
                                <div className={style.trail_lesson_right}>
                                    <strong>{value.title}</strong>
                                    <p>
                                        {
                                            value.description && value.description.length > 162 ? value.description.substring(0, 160)+"..." : value.description
                                        }
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            

            {isModalVisible && <MenuModal />}
        </div>
    );
}
