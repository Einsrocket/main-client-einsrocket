import React from "react";
import { BottomNavigation } from "../components/bottom_navigation/Index";

import { DiscoverContainer } from "../features/discover/components/main/Index";

export function Discover() {
    return (
        <div>
            <DiscoverContainer />
            <BottomNavigation route='discover' />
        </div>
    );
}
