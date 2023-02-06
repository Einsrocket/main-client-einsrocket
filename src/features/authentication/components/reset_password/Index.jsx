import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles.module.css";
import Swal from "sweetalert2";
import { XCircle } from "phosphor-react";

export function Main() {
    const navigate = useNavigate();
    const [activationCode, setActivationCode] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [sentEmail, setSentEmail] = useState(false);

    var cookies = document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce(
            (accumulator, [key, value]) => ({
                ...accumulator,
                [key.trim()]: decodeURIComponent(value),
            }),
            {}
        );

    const sendCode = (event) => {
        event.preventDefault();

        const uploadDataObject = {
            email,
        };
        // eufrasiojoao00@gmail.com

        if (isLoading === false) {
            setIsLoading(true);

            fetch(`${cookies?.__server}/users/send_activation_code`, {
                method: "POST",
                body: JSON.stringify(uploadDataObject),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    if (!data.succes) {
                        Swal.fire({
                            title: "ALERTA!",
                            text: data.message,
                            icon: "warning",
                            confirmButtonText: "OK",
                        });
                    }

                    if (data.succes) {
                        Swal.fire({
                            title: "SUCESSO!",
                            text: data.message,
                            icon: "success",
                            confirmButtonText: "OK",
                        });
                        setSentEmail(true);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                    Swal.fire({
                        title: "Erro!",
                        text: "Erro ao enviar codigo",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                });
        } else {
            setIsLoading(false);
        }
    };

    const verifyCode = (event) => {
        event.preventDefault();

        const uploadDataObject = {
            email,
            activation_code: activationCode,
        };

        if (isLoading === false) {
            setIsLoading(true);

            fetch(`${cookies?.__server}/users/verify_activation_code`, {
                method: "POST",
                body: JSON.stringify(uploadDataObject),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    if (!data.succes) {
                        Swal.fire({
                            title: "ALERTA!",
                            text: data.message,
                            icon: "warning",
                            confirmButtonText: "OK",
                        });
                    }
                    if (data.succes) {
                        setIsReady(true);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                    Swal.fire({
                        title: "Erro!",
                        text: "Erro ao verificar codigo",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                });
        } else {
            setIsLoading(false);
        }
    };

    const resetPassword = (event) => {
        event.preventDefault();

        const uploadDataObject = {
            new_password: newPassword,
            email,
        };

        if (newPassword.length < 8) {
            Swal.fire({
                title: "ALERTA!",
                text: "A palavra passe tem que ter no minimo 8 caracteres",
                icon: "warning",
                confirmButtonText: "OK",
            });

            return;
        }

        if (newPassword !== confirmNewPassword) {
            Swal.fire({
                title: "ALERTA!",
                text: "As palavras passes não coincidem",
                icon: "warning",
                confirmButtonText: "OK",
            });

            return;
        } else {
            if (isLoading === false) {
                setIsLoading(true);

                fetch(`${cookies?.__server}/users/update_password`, {
                    method: "POST",
                    body: JSON.stringify(uploadDataObject),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        if (!data.succes) {
                            Swal.fire({
                                title: "ALERTA!",
                                text: data.message,
                                icon: "warning",
                                confirmButtonText: "OK",
                            });
                            setIsLoading(false);
                        }
                        if (data.succes) {
                            Swal.fire({
                                title: "SUCESSO!",
                                text: data.message,
                                icon: "success",
                                confirmButtonText: "OK",
                            });
                            setIsLoading(false);
                        }
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        console.log(err);
                        Swal.fire({
                            title: "Erro!",
                            text: "Erro ao atualizar palavra passe",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    });
            } else {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={style.login_container}>
            <div className={style.login_container_left} data-aos="fade-left">
                {!sentEmail ? (
                    <div>
                        <form onSubmit={sendCode}>
                            <h1>Enviar codigo de recuperação de senha</h1>
                            <input
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Seu email"
                            />

                            {!isLoading && <button>Enviar codigo</button>}
                            {isLoading && (
                                <button className={style.loading_button}>
                                    Processando...
                                </button>
                            )}
                        </form>
                    </div>
                ) : (
                    <div>
                        {!isReady && (
                            <form onSubmit={verifyCode}>
                                <h1>
                                    Verificar codigo de recuperação de senha
                                </h1>
                                <input
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Seu email"
                                />
                                <input
                                    required
                                    onChange={(e) =>
                                        setActivationCode(e.target.value)
                                    }
                                    type="number"
                                    placeholder="Codigo de recuperação de senha"
                                />

                                {!isLoading && <button>Vericar codigo</button>}
                                {isLoading && (
                                    <button className={style.loading_button}>
                                        Processando...
                                    </button>
                                )}

                                <div>
                                    <span onClick={() => setSentEmail(false)}>
                                        <XCircle
                                            size={30}
                                            color="#eee"
                                            weight="duotone"
                                        />
                                    </span>
                                </div>
                            </form>
                        )}

                        {isReady && (
                            <form onSubmit={resetPassword}>
                                <h1>Atualizar pallavra passe</h1>
                                <input
                                    required
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    type="password"
                                    placeholder="Nova palavra passe"
                                />
                                <input
                                    required
                                    onChange={(e) =>
                                        setConfirmNewPassword(e.target.value)
                                    }
                                    type="password"
                                    placeholder="Confirmar nova palavra passe"
                                />

                                {!isLoading && <button>Atualizar</button>}
                                {isLoading && (
                                    <button className={style.loading_button}>
                                        Processando...
                                    </button>
                                )}

                                <div>
                                    <span onClick={() => setIsReady(false)}>
                                        <XCircle
                                            size={30}
                                            color="#eee"
                                            weight="duotone"
                                        />
                                    </span>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
