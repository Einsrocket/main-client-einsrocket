import { HouseLine, User, Binoculars } from "phosphor-react";
import { useNavigate } from "react-router-dom";

import style from "./styles.module.css";

export function BottomNavigation({route}) {
    const navigate = useNavigate()

    const navigateToPage = async (rota) =>{
        navigate(`/${rota}`)
    }

    return (
        <div className={style.bottom_navigation}>
            <button onClick={()=>navigateToPage('dashboard')}>
                <HouseLine color={route === "dashboard" ? "rgb(255, 223, 44)" : "rgba(157, 109, 235, 1)"} weight='fill'/>
                {route === 'dashboard' && <span>Dashboard</span>}
            </button>
            <button onClick={()=>navigateToPage('discover')}>
                <Binoculars color={route === "discover" ? "rgb(255, 223, 44)" : "rgba(157, 109, 235, 1)"} weight='fill'/>
                {route === 'discover' && <span>Discover</span>}
            </button>
            <button onClick={()=>navigateToPage('profile')}>
                <User color={route === "profile" ? "rgb(255, 223, 44)" : "rgba(157, 109, 235, 1)"} weight='fill'/>
                {route === 'profile' && <span>Perfil</span>}
            </button>
        </div>
    );
}
