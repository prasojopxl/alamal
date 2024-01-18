import React from 'react'
import AboutPage from "./ProgramPage"

export default function PageAbout() {
    return (
        <div>
            <div className="bg-main-c w-full h-[200px] flex justify-center items-center">
                <h1 className="text-white text-3xl font-bold">Program Kami</h1>
            </div>
            <div className="wrapper py-16">
                <AboutPage />
            </div>

        </div>
    )
}
