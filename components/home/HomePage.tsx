"use client"

import MainBanner from "./MainBanner"
import ListDonate from "./ListDonate"
import MainInfo from "./MainInfo"
import Quote from "./Quote"
import Testimoni from "./Testimoni"

export default function HomePage() {
    return (
        <div className="relative">
            <MainBanner />
            <Quote />
            <MainInfo />
            <ListDonate />
            <Testimoni />
        </div>
    )
}
