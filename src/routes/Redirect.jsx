import { Navigate } from "react-router-dom";

export function Redirect({ children }) {
    return document.cookie
        .split(";")
        .map((cookie) => cookie.split("="))
        .reduce(
            (accumulator, [key, value]) => ({
                ...accumulator,
                [key.trim()]: decodeURIComponent(value),
            }),
            {}
        )?.__loggedIn == "true" ? (
        <Navigate to="/dashboard" />
    ) : (
        children
    );
}
