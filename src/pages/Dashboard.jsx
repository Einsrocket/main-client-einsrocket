import React from "react";
import { BottomNavigation } from "../components/bottom_navigation/Index";

import { DashboarContainer } from "../features/dashboard/components/main/Index";

export function Dashboard() {
    return (
        <div>
            <DashboarContainer />
            <BottomNavigation route='dashboard' />
        </div>
    );
}
