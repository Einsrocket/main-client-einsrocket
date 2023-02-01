import React from "react";
import { BottomNavigation } from "../components/bottom_navigation/Index";

import { LessonContainer } from "../features/lesson/components/main/Index";

export function Lesson() {
    return (
        <div>
            <LessonContainer />
            <BottomNavigation />
        </div>
    );
}
