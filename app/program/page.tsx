import React from 'react'
import AboutPage from "./ProgramPage"
import { BiDonateBlood } from "react-icons/bi";
import ProgramPage from "./ProgramPage";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Sidrat Alamal Jaya Program",
};

export default function PageProgram() {
    return (
        <div>
            <div className="relative bg-main-c w-full h-[200px] flex justify-center items-center">
                <div className="absolute text-[200px] text-white opacity-20"><BiDonateBlood /></div>
                <h1 className="text-white text-5xl font-bold relative">Program Kami</h1>
            </div>
            <div className="wrapper py-16">
                <ProgramPage />
            </div>

        </div>
    )
}
