"use client"
import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";

export default function Header() {
    const [menuXS, setMenuXS] = useState(false);
    return (
        <>
            <div className="bg-gray py-2">
                <div className="wrapper">
                    <div className="flex items-center justify-between text-[14px]">
                        <div className="flex items-center gap-2">
                            Wa Center:
                            <Link href="/" className="flex items-center gap-1"><IoLogoWhatsapp className="text-green-500" /><span>0815 2222 2222</span></Link>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/"><FaFacebook /></Link>
                            <Link href="/"><FaInstagram /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white sticky top-0 z-20">
                <div className="wrapper">
                    <div className="flex items-center justify-between lg:py-4">
                        <div className="flex justify-between font-black text-3xl">
                            <Link href="/" className="text-orange-c"><Image src="/images/logo.jpeg" width={70} height={70} alt="logo" /></Link>
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
