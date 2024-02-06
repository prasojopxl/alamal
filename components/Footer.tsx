"use client"

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";
import Basecontent from "@/components/basecontent"
import { getData } from "@/app/utils/services";

function FooterContent() {
    const getQuery = async () => {
        return await getData(`/other-pages?populate=*`)
    }
    const query = useQuery({
        queryKey: ["listOtherPages"],
        queryFn: getQuery
    })
    const getQuery2 = async () => {
        return await getData(`/general?populate=*`)
    }
    const query2 = useQuery({
        queryKey: ["general"],
        queryFn: getQuery2
    })

    const general = query2.data?.data.data.attributes
    if (query.isLoading) {
        return (
            <div className="wrapper relative flex justify-center mt-10">
                <div className="animate-pulse w-full">
                    <div className="rounded-sm bg-slate-200 h-[30px] w-full "></div>
                    <div className="rounded-sm bg-slate-200 h-[30px] w-[700px] my-5"></div>
                    <div className="rounded-sm bg-slate-200 h-[30px] w-[200px] "></div>
                </div>
            </div>
        )
    }

    if (query.isError) {
        return (
            <ErrorNetwork />
        )
    }


    return (
        <div>
            <div className="wrapper">
                {
                    general?.note ? <div className="p-5 bg-gray rounded-sm my-5 text-xs">
                        {parse(general?.note)}
                    </div> : null

                }
            </div>
            <div className="bg-stone-100 py-7 mt-10">
                <div className="wrapper">
                    <div className="flex flex-wrap lg:-mx-5 text-[14px]">
                        <div className="lg:w-3/12 w-full lg:p-5">
                            <Link href="/" className="text-orange-c">
                                <Image src={general?.logo.data ? process.env.URL_MEDIA + general?.logo.data.attributes.url : "/images/logo.png"} width={70} height={70} alt="logo" />
                            </Link>
                            <h4 className="mt-3 text-[16px] font-bold">{general?.company}</h4>
                            <div className="text-[12px]">{parse(`${general?.short_about}`)}</div>
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
                                {
                                    query.data?.data.data.map((item: any) => {
                                        return (
                                            <li key={item.id}><Link href={`/page/${item.attributes.slug}`}>{item.attributes.title && item.attributes.title}</Link></li>

                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="lg:w-3/12 w-full lg:p-5">
                            <h4 className="mt-3 text-[21px] font-bold mb-2  ">CONTACT US</h4>
                            <div>
                                {parse(`${general?.address}`)}
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

export default function Footer() {
    return (
        <Basecontent>
            <FooterContent />
        </Basecontent>
    )
}