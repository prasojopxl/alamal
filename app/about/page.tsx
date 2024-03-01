import React from 'react'
import AboutPage from "./AboutPage"
import { VscOrganization } from "react-icons/vsc";

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sidrat Alamal Jaya About",
};


export default function PageAbout() {
    return (
        <div>
            <div className="relative bg-main-c w-full h-[200px] flex justify-center items-center">
                <div className="absolute text-[200px] text-white opacity-20"><VscOrganization /></div>
                <h1 className="text-white text-5xl font-bold relative">Tentang Kami</h1>
            </div>

            <div className="wrapper py-16">
                <AboutPage />
            </div>

        </div>
    )
}
