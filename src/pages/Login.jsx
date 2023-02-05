import React from "react";
import { Header } from "../components/header/Index";

import { LoginContainer } from "../features/authentication/components/login/Index";

export function Login() {
    return (
        <div>
            <Header />
            <LoginContainer />
        </div>
    );
}
