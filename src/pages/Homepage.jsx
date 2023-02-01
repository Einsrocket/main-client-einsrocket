import React from "react";
import { Navigate } from "react-router-dom";

import { Hero } from "../features/homepage/components/hero/Index";
import { StartNow } from "../features/homepage/components/start_now/Index";
import { WhyChoose } from "../features/homepage/components/why_choose_us/Index";
import { OurMethods } from "../features/homepage/components/our_methods/Index";
import { Connect } from "../features/homepage/components/connect/Index";
import { WhatsAppLogo } from "../features/homepage/components/whatsapp_logo/Index";
import { Footer } from "../components/footer/Index";
import { Video } from "../features/homepage/components/video/Index";


export function Homepage() {
    var cookies = document.cookie.split(';')
    .map((cookie)=> cookie.split('='))
    .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

    
    return (
            <div>
                <Hero />
                <Video />
                <StartNow />
                <WhyChoose />
                <OurMethods />
                <Connect />
                <WhatsAppLogo />
                <Footer />
            </div>
    );
}
