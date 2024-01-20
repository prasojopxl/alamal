import Image from 'next/image'
import Link from "next/link"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import HomePage from "@/components/home/HomePage"
import Basecontent from "@/components/basecontent"

export default function Home() {

    return (
        <main>
            <Basecontent>
                <HomePage />
            </Basecontent>
        </main>
    )
}
