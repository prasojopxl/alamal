import React from 'react'
import CampaignPage from "./CampaignPage"

export default function PageAbout() {
    return (
        <div>
            <div className="bg-main-c w-full h-[200px] flex justify-center items-center">
                <h1 className="text-white text-3xl font-bold">Campaign</h1>
            </div>
            <div className="wrapper py-16">
                <CampaignPage />
            </div>

        </div>
    )
}
