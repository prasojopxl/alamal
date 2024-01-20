import React from 'react'
import CampaignPage from "./CampaignPage"
import { BiDonateHeart } from "react-icons/bi";

export default function PageAbout() {
    return (
        <div>
            <div className="relative bg-main-c w-full h-[200px] flex justify-center items-center">
                <div className="absolute text-[200px] text-white opacity-20"><BiDonateHeart /></div>
                <h1 className="text-white text-5xl font-bold relative">Campaign Kami</h1>
            </div>
            <div className="wrapper py-16">
                <CampaignPage />
            </div>

        </div>
    )
}
