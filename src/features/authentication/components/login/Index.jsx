import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";


export function LoginContainer() {
    const navigate =  useNavigate()
    const [password, setPassword] =  useState('')
    const [username, setUsername] =  useState('')
    const [message, setMessage] =  useState('')
    const [isLoading, setIsLoading] =  useState(false)

    var cookies = document.cookie.split(';')
        .map((cookie)=> cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    const handleSubmit = (event) =>{
        event.preventDefault();
        setMessage('')

        const uploadDataObject = {
            username,
            password,
        }

        if(isLoading === false){
            setIsLoading(true)

            fetch(`${cookies?.__server}/users/login`, {
                method: 'POST',
                body: JSON.stringify(uploadDataObject),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{
                setMessage(data.message)
                // console.log(data)
    
                if(data.succes){
                    //creating user sigla
                    let i = username.split('')
                    for (let index = 0; index < i.length; index++) {
                        if(i[index] == ' '){
                            let b = username.split(' ');
                            document.cookie = `__sigla=${b[0].split('')[0]}`;
                            break;
                        }else{
                            let b = username.split('');
                            document.cookie = `__sigla=${b[0].split('')[0]}`;
                        }
                    }
    
                    document.cookie = `__token=${data.token}`;
                    document.cookie = `__username=${username}`;
                    document.cookie = "__loggedIn=true"
                    document.cookie = `__userid=${data.userData.id}`
    
                    navigate('/dashboard')
                }else{
                    setIsLoading(false)
                }
            })
            .catch(err=>console.log(err))
        }else{
            setIsLoading(false)
        }
        
    }  

    return (
            <div className={style.login_container}>
                <div className={style.login_container_right} data-aos="fade-right">
                    <div >
                        <img src='Logo.jpg' alt=''/> <span>EASY LEARNING</span>
                    </div>
                    <h1>Faça seu login na plataforma.</h1>
                    
                </div>
                <div className={style.login_container_left} data-aos="fade-left">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h1>FAÇA LOGIN</h1>
                            <input required onChange={(e)=>setUsername(e.target.value)} type='text' placeholder='Seu nome'/>
                            <input required onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Sua senha'/>
                            {message && <p><span>{message}</span></p>}
                            <p>Não tem uma conta?  <a href='/signup'>Registe-se</a>.</p>
                            { !isLoading && <button>LOGIN</button>}
                            { isLoading && <button className={style.loading_button}>Processando...</button>}
                        </form>
                    </div>
                </div>
            </div>
    );
}
