import React from "react";
import { Navigate } from "react-router-dom";
import { BottomNavigation } from "../components/bottom_navigation/Index";

import { Main } from "../features/quizpage/components/main/Index";


export function Quizpage() {
    return (
            <div>
                <Main/>
                <BottomNavigation />
            </div>
    );
}
