import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Header() {
    return (
        <>
            <div className=" bg-gray py-2">
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
                    <div className="flex items-center justify-between py-4">
                        <div className="flex justify-between font-black text-3xl">
                            <Link href="/" className="text-orange-c"><Image src="/images/logo.jpeg" width={70} height={70} alt="logo" /></Link>
                        </div>
                        <div className="relative flex items-center gap-7">
                            <ul className="flex items-center gap-7 font-medium text-[16px]">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/about">Tentang Kami</Link></li>
                                <li><Link href="/program">Program</Link></li>
                                <li><Link href="/campaign">Campaign</Link></li>
                                <li><Link href="/">Kolaborasi</Link></li>
                            </ul>
                            <Link href="/" className="btn">Donasi</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
