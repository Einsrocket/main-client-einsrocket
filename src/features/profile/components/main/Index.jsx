import {useEffect,useState} from 'react'
import {Pen, Plus} from "phosphor-react";
import style from "./styles.module.css";

import { DashboardHeader } from "../../../../components/dashboard_header/Index";
import { UpdateModal } from "../update_modal/Index";


export function ProfileContainer() {
    const [userData, setUserData] =  useState()
    const [biography, setBiography] =  useState()
    const [email, setEmail] =  useState()
    const [phone, setPhone] =  useState()
    const [ocupation, setOcupation] =  useState()
    const [entryDate, setEntryDate] =  useState()
    const [modalVisible, setmodalVisible] =  useState(false)
    const [formatedUsername, setFormatedUsername] =  useState('')

    var cookies = document.cookie.split(';')
        .map((cookie)=> cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});


    async function getUserInfo() {
        let user = await cookies?.__username

        await fetch(`${cookies?.__server}/users/single/${user}`)
            .then(res=>res.json())
            .then(data=>{
                setEntryDate(data.entry_date);
                setUserData(data.result);
                setEmail(data.result.email);
                setPhone(data.result.phone);
                setOcupation(data.result.ocupation);
                setBiography(data.result.biography == 'null' ? null : data.result.biography);
            })
            .catch(err=>console.log(err))
        
    }

    async function getFormatedUsername() {
        let username = await cookies?.__username
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
            <div className={style.profile}>
                <DashboardHeader />
                <div className={style.profile_banner}>
                    <Pen color='hsl(210, 38%, 95%)' size={20}/>
                </div>

                <div className={style.profile_row}>
                    <div className={style.profile_left}>
                        <div  className={style.sigla_circle}>{cookies?.__sigla.toUpperCase()}</div>
                        <strong>{formatedUsername ? formatedUsername : userData?.username}</strong>
                        <Pen color='hsl(210, 38%, 95%)' size={20} onClick={()=>setmodalVisible(true)}/>

                        <div className={style.member_since}>
                            <p>MEMBRO DESDE: {entryDate}</p>
                        </div>
                    </div>

                    <div className={style.profile_right}>
                        <div className={style.profile_right_box}>
                            <strong>Sobre mim</strong>
                            {biography &&
                                <p>{biography}</p>
                            }
                            {!biography  &&
                            
                                <div onClick={()=>setmodalVisible(true)}  className={style.profile_right_no_content_box}>
                                    <Plus color='rgba(157, 109, 235, 0.856)' size={25}/>
                                    Quem é voce e o que faz?
                                </div>
                            }
                            <Pen color='hsl(210, 38%, 95%)' size={20}  className={style.pen} onClick={()=>setmodalVisible(true)}/>
                        </div>
                        {
                            email && email !== 'null' && 
                            <div className={style.profile_right_box}>
                                <strong>Email</strong>
                                <p>{email}</p>
                            </div>
                        }
                        {
                            phone && phone !== 'null' &&
                            <div className={style.profile_right_box}>
                                <strong>Telefone</strong>
                                <p>{phone}</p>
                            </div>
                        }
                        {
                            ocupation && ocupation !== 'null' &&
                            <div className={style.profile_right_box}>
                                <strong>Area de ocupação</strong>
                                <p>{ocupation}</p>
                            </div>
                        }
                    </div>
                </div>

                {modalVisible && <UpdateModal updateValues={() => getUserInfo()} onClose = {() => setmodalVisible(false)}/>}
            </div>
    );
}
