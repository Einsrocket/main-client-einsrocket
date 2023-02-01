import React from "react";
import { BottomNavigation } from "../components/bottom_navigation/Index";

import { ProfileContainer } from "../features/profile/components/main/Index";

export function Profile() {
    return (
        <div>
            <ProfileContainer />
            <BottomNavigation route='profile' />
        </div>
    );
}
