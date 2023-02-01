import React from "react";
import { BottomNavigation } from "../components/bottom_navigation/Index";

import { TrailContainer } from "../features/trail/components/main/Index";

export function Trail() {
    return (
        <div>
            <TrailContainer />
            <BottomNavigation />
        </div>
    );
}
