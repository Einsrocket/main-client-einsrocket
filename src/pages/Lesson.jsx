import React from "react";
import { BottomNavigation } from "../components/bottom_navigation/Index";
import { DashboardHeader } from "../components/dashboard_header/Index";

import { LessonContainer } from "../features/lesson/components/main/Index";

export function Lesson() {
    return (
        <div>
            <DashboardHeader />
            <LessonContainer />
            <BottomNavigation />
        </div>
    );
}
