"use client"
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { RiMenu3Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Basecontent from "./basecontent";
import { getData } from "@/app/utils/services";
import _ from "lodash";

function HeaderContent() {
    const [menuXS, setMenuXS] = useState(false);
    const getQuery2 = async () => {
        return await getData(`/general?populate=*`)
    }
    const query2 = useQuery({
        queryKey: ["general"],
        queryFn: getQuery2
    })
    const general = query2.data?.data.data.attributes
    const whatsapp = _.slice(`${general?.whatsapp}`, 1).join("")
    return (
        <>
            <div className="bg-gray py-2">
                <div className="wrapper">
                    <div className="flex items-center justify-between text-[14px]">
                        {general?.whatsapp ? <Link target="_blank" href={`https://api.whatsapp.com/send?phone=62${whatsapp}&text=Halo%20Salamal,`} className="flex items-center gap-1"><IoLogoWhatsapp className="text-green-500" /><span>{general?.whatsapp}</span></Link> : null}
                        { }
                        <div className="flex gap-3">
                            {general?.facebook ? <Link href={`${general?.facebook}`}><FaFacebook /></Link> : null}
                            {general?.instagram ? <Link href={`${general?.instagram}`}><FaInstagram /></Link> : null}
                            {general?.linkedin ? <Link href={`${general?.linkedin}`}><FaLinkedin /></Link> : null}
                            {general?.youtube ? <Link href={`${general?.youtube}`}><FaYoutube /></Link> : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white sticky top-0 z-20">
                <div className="wrapper">
                    <div className="flex items-center justify-between lg:py-4">
                        <div className="flex justify-between font-black text-3xl">
                            <Image src={general?.logo.data ? process.env.URL_MEDIA + general?.logo.data.attributes.url : "/images/logo.png"} width={70} height={70} alt="logo" />
                        </div>
                        <div className="relative lg:flex items-center gap-7 hidden">
                            <ul className="flex items-center gap-7 font-medium text-[16px]">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/about">Tentang Kami</Link></li>
                                <li><Link href="/program">Program</Link></li>
                                <li><Link href="/campaign">Campaign</Link></li>
                            </ul>
                            <Link href="/donate" className="btn">Donasi</Link>
                        </div>
                        <div className="lg:hidden flex items-center gap-2">
                            <Link href="/donate" className="btn">Donasi</Link>
                            <div className="text-3xl cursor-pointer" onClick={() => setMenuXS(!menuXS)}> <RiMenu3Fill /></div>
                        </div>
                    </div>
                </div>
            </div>
            {
                menuXS ? <div className="pb-2 lg:hidden">
                    <ul className="flex items-center font-medium text-[16px] flex-col [&_a]:py-2 [&_a]:block">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">Tentang Kami</Link></li>
                        <li><Link href="/program">Program</Link></li>
                        <li><Link href="/campaign">Campaign</Link></li>
                    </ul>
                </div> : null
            }
        </>
    )
}
export default function Header() {
    return (
        <Basecontent>
            <HeaderContent />
        </Basecontent>
    )
}
