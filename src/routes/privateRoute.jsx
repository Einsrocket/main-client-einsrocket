import { Navigate } from "react-router-dom";



export function PrivateRoute({children}) { 
    var cookies = document.cookie.split(';')
    .map((cookie)=> cookie.split('='))
    .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    var user = cookies?.__loggedIn
    

    return user === 'true' ? children : <Navigate to='/signin'/>
}
