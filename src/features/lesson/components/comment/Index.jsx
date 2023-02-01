import {useEffect,useState} from 'react'

import style from "./styles.module.css";


export function Comment({value}) {
    const [userSigla, setUserSigla] =  useState('')

    async function getUserSigla() {
        let username = await value.author
        let i = username.split('')

        for (let index = 0; index < i.length; index++) {
            if(i[index] == ' '){
                let b = username.split(' ');
                setUserSigla(b[0].split('')[0]);

                break;
            }
            else{
                let b = username.split('');
                setUserSigla(b[0].split('')[0]);
            }
        }
    
    }

    useEffect(()=>{
        getUserSigla()
    }, [])


    return (
        <div key={value.id} className={style.post_comment}>
            <div className={style.post_comment_avatar_div}>{userSigla}</div>
                <div className={style.post_comment_box} >
                    <span className={style.post_comment_username}>{value.author}</span>
                    <span className={style.post_comment_comment}>{value.description}</span>
                </div>
        </div>
    );
}
