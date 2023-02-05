import React from "react";
import { BottomNavigation } from "../components/bottom_navigation/Index";
import { DashboardHeader } from "../components/dashboard_header/Index";

import { DiscoverContainer } from "../features/discover/components/main/Index";

export function Discover() {
    return (
        <div>
            <DashboardHeader />
            <DiscoverContainer />
            <BottomNavigation route="discover" />
        </div>
    );
}
