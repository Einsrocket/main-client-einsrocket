import React, { useState, useEffect } from "react";
import Style from "./Style.module.css";

export const UpdateModal = ({
    onClose = () => {},
    updateValues = () => {},
}) => {
    // states
    // const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [biography, setBiography] = useState();
    const [ocupation, setOcupation] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [id, setId] = useState();
    const [isLoading, setIsLoading] =  useState(false)
    
    var cookies = document.cookie.split(';')
        .map((cookie)=> cookie.split('='))
        .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});


    async function getUserInfo() {
        let user = await cookies?.__username;

        await fetch(`${cookies?.__server}/users/single/${user}`)
            .then((res) => res.json())
            .then((data) => {
                // setUsername(data.result.username);
                setEmail(data.result.email);
                setPhone(data.result.phone);
                setBiography(data.result.biography);
                setOcupation(data.result.ocupation);
                setCity(data.result.city);
                setState(data.result.state);
                setCountry(data.result.country);
                setId(data.result.id);
            })
            .catch((err) => console.log(err));
    }

    // submit values
    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = await cookies?.__username;

        // object to be submited
        const valuesToSubmit = {
            id,
            email,
            city,
            state,
            country,
            ocupation,
            biography,
            phone,
        };

        if(isLoading === false){
            setIsLoading(true)

            fetch(`${cookies?.__server}/users/update_info`, {
                method: "POST",
                body: JSON.stringify(valuesToSubmit),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.succes) {
                        setIsLoading(false)
                        onClose();
                        updateValues();
                    }else setIsLoading(false)
                })
                .catch((err) => console.log(err));
        }else setIsLoading(false)

    };

    useEffect(() => {
        getUserInfo();
    }, []);    


    return (
        <div className={Style.updateModal}>
            <div data-aos="fade-down" className={Style.form}>
                <div onClick={onClose} className={Style.closeContainer}>
                    <div className={Style.close}></div>
                </div>
                <h3>Meu perfil</h3>
                <br />

                <small>Seu E-mail</small>
                <input
                    required
                    type="text"
                    value={email !== "null" ? email : ""}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <small>Telefone</small>
                <input
                    required
                    type="number"
                    value={phone !== "null" ? phone : ""}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <small>Sua ocupção</small>
                <input
                    required
                    type="text"
                    value={ocupation !== "null" ? ocupation : ""}
                    onChange={(e) => setOcupation(e.target.value)}
                />

                <div className={Style.form_row}>
                    <div>
                        <small>Cidade</small>
                        <input
                            required
                            type="text"
                            value={city !== "null" ? city : ""}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <small>Estado</small>
                        <input
                            required
                            type="text"
                            value={state !== "null" ? state : ""}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div>
                        <small>País</small>
                        <input
                            required
                            type="text"
                            value={country !== "null" ? country : ""}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                </div>

                <small>Sua biografia</small>
                <textarea
                    value={biography !== "null" ? biography : ""}
                    onChange={(e) => setBiography(e.target.value)}
                ></textarea>

                <div className={Style.form_buttons}>
                    <button onClick={onClose}>CANCELAR</button>
                    {isLoading && <button onClick={handleSubmit} className={Style.loading_button}>PROCESSANDO</button>}
                    {!isLoading && <button onClick={handleSubmit}>CONFIRMAR ALTERAÇÕES</button>}
                </div>
            </div>
        </div>
    );
};
