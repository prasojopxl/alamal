import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div>
            <div className="wrapper">
                <div className="p-5 bg-gray rounded-sm my-5 text-xs">
                    Dana yang didonasikan melalui Sidrat Alamal Jaya bukan bersumber dan bukan untuk tujuan pencucian uang (money laundry), termasuk terorisme maupun tindak kejahatan lainnya.
                </div>
            </div>
            <div className="bg-stone-100 py-7 mt-10">
                <div className="wrapper">
                    <div className="flex flex-wrap lg:-mx-5 text-[14px]">
                        <div className="lg:w-3/12 w-full p-5">
                            <Link href="/" className="text-orange-c"><Image src="/images/logo.png" width={70} height={70} alt="logo" /></Link>
                            <h4 className="mt-3 text-[16px] font-bold">SIDRAT ALAMAL JAYA</h4>
                            <div className="text-[12px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, aliquam, sequi aliquid consequatur minus quidem sint rerum.</div>
                        </div>
                        <div className="lg:w-3/12 w-full lg:p-5">
                            <h4 className="mt-3 text-[21px] font-bold mb-2  ">MAIN LINKS</h4>
                            <ul className="[&_a]:block [&_a]:py-[2px]">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/about">Tentang Kami</Link></li>
                                <li><Link href="/program">Program</Link></li>
                                <li><Link href="/campaign">Campaign</Link></li>
                            </ul>
                        </div>
                        <div className="lg:w-3/12 w-full lg:p-5">
                            <h4 className="mt-3 text-[21px] font-bold mb-2  ">QUICK LINKS</h4>
                            <ul className="[&_a]:block [&_a]:py-[2px]">
                                <li><Link href="/tnc">Syarat dan Ketentuan</Link></li>
                                <li><Link href="/policy">Kebijakan Privasi</Link></li>
                            </ul>
                        </div>
                        <div className="lg:w-3/12 w-full lg:p-5">
                            <h4 className="mt-3 text-[21px] font-bold mb-2  ">CONTACT US</h4>
                            <div>
                                Surabaya X Tower, Lantai 212<br />
                                Jl. Prof. Dr. Satrio Blok C4 No. 5
                                Surabaya Jawa Timur 12950, Indonesia
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-main-c py-5 text-center text-white text-sm">
                {
                    moment().format('YYYY') + " © " + "Sidrat Alamal Jaya"
                }
            </div>

        </div>
    )
}
