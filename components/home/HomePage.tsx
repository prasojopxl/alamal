"use client"

import MainBanner from "./MainBanner"
import ListDonate from "./ListDonate"
import MainInfo from "./MainInfo"
import Quote from "./Quote"
import Testimoni from "./Testimoni"
import Gallery from "./gallery"

export default function HomePage() {
    return (
        <div className="relative">
            <MainBanner />
            <MainInfo />
            <ListDonate />
            <Testimoni />
            <Gallery />
        </div>
    )
}
