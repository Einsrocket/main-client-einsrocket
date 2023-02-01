// import  { useNavigate } from "react-router-dom";
import { useState } from "react";
import Style from "./Style.module.css";

export const MenuModal = () => {
    // const navigate = useNavigate();
    const [planSelected, setPlanSelected] = useState(false)
    const [planSelectedPremium, setPlanSelectedPremium] = useState(false)
    const [planSelectedStandard, setPlanSelectedStandard] = useState(false)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState(false)

    const makePayment = (type)=>{
        input && setLoading(true)

        let price;

        type === 'standard' ? price = 200 : price = 2400

        console.log(type, price, input);
        
        
    }


    return (
        <div className={Style.payment_Modal}>
            <div data-aos="fade-down" className={Style.form}>
                <h3>
                    {planSelected ? 'Efetue o pagamento' : 'Selecione o plano'}
                </h3>
                
                {/* initial form presentation  */}
                {
                    !planSelected && 
                    <div className={Style.payment_Modal_row}>
                        <div className={Style.payment_Modal_item}>
                            <strong>Padrão</strong>
                            <div className={Style.payment_Modal_price_container}>
                                <small>$<span>200</span> MTS\mes</small>
                                <small className={Style.payment_Modal_real_price}><span>500MTS</span></small>
                            </div>

                            <div className={Style.payment_Modal_topics}>
                                <p>Modulos {'&'} Aulas</p>
                                <p>Live projects</p>
                                <p>Exercicios</p>
                                <p>Suporte</p>
                                <p>_</p>
                                <p>_</p>
                            </div>

                            <div className={Style.payment_Modal_select_container}>
                                <button onClick={()=>{
                                    setPlanSelected(true)
                                    setPlanSelectedStandard(true)
                                }}>SELECIONAR PLANO</button>
                            </div>
                        </div>

                        <div className={Style.payment_Modal_item}>
                            <strong>Premium</strong>
                            <div className={Style.payment_Modal_price_container}>
                                <small>$<span>2,400</span> MTS\ano</small>
                                <small className={Style.payment_Modal_real_price}><span>3,000MTS</span></small>
                            </div>

                            <div className={Style.payment_Modal_topics}>
                                <p>Features Desbloqueadas</p>
                                <p>Modulos {'&'} Aulas</p>
                                <p>Acesso ilimitado</p>
                                <p>Live projects</p>
                                <p>Exercicios</p>
                                <p>Suporte</p>
                            </div>

                            <div className={Style.payment_Modal_select_container}>
                                <button onClick={()=>{
                                    setPlanSelected(true)
                                    setPlanSelectedPremium(true)
                                }}>SELECIONAR PLANO</button>
                            </div>
                        </div>
                    </div>
                }


                    <div className={Style.payment_Modal_row}>
                        {
                            planSelectedStandard && 
                            <div className={Style.payment_Modal_item}>
                                <strong>Padrão</strong>
                                <div className={Style.payment_Modal_topics}>
                                    <p>Insira o seu numero de telefone e pague via Mpesa</p>
                                    <input type='number' placeholder='Telefone' onChange={(e)=>setInput(e.target.value)}></input>
                                </div>

                                <div className={Style.payment_Modal_select_container}>
                                    {
                                        loading &&
                                            <button className={Style.pay_button_shimmer}>PROCESSANDO</button>
                                    }
                                    {
                                            loading === false && <button className={Style.pay_button} onClick={()=>makePayment('standard')}>PAGAR</button>
                                    }
                                    {
                                        !loading && <button  className={Style.pay_button} onClick={()=>{
                                            setPlanSelectedStandard(false)
                                            setPlanSelectedPremium(false)
                                            setPlanSelected(false)
                                        }}>VOLTAR</button>
                                    }
                                </div>
                            </div>
                        }
                        {
                            planSelectedPremium && 
                            <div className={Style.payment_Modal_item}>
                                <strong>Premium</strong>
                                <div className={Style.payment_Modal_topics}>
                                    <p>Insira o seu numero de telefone e pague via Mpesa</p>
                                    <input type='number' placeholder='Telefone' onChange={(e)=>setInput(e.target.value)}></input>
                                </div>

                                <div className={Style.payment_Modal_select_container}>
                                    {
                                        loading &&
                                            <button className={Style.pay_button_shimmer}>PROCESSANDO</button>
                                    }
                                    {
                                            loading === false && <button className={Style.pay_button} onClick={()=>makePayment('premium')}>PAGAR</button>
                                    }
                                    {
                                        !loading && <button  className={Style.pay_button} onClick={()=>{
                                            setPlanSelectedStandard(false)
                                            setPlanSelectedPremium(false)
                                            setPlanSelected(false)
                                        }}>VOLTAR</button>
                                    }
                                </div>
                            </div>
                        }
                    </div>
            </div>
        </div>
    );
};
