import React from "react";
import { Header } from "../components/header/Index";

import { RegisterContainer } from "../features/authentication/components/register/Index";

export function Register() {
    return (
        <div>
            <Header />
            <RegisterContainer />
        </div>
    );
}
