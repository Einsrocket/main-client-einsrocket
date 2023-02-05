import React from "react";
import { BottomNavigation } from "../components/bottom_navigation/Index";
import { DashboardHeader } from "../components/dashboard_header/Index";

import { TrailContainer } from "../features/trail/components/main/Index";

export function Trail() {
    return (
        <div>
            <DashboardHeader />
            <TrailContainer />
            <BottomNavigation />
        </div>
    );
}
