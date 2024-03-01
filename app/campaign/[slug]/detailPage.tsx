"use client"
import Image from "next/image"
import parse from "html-react-parser";
import { useQuery } from "@tanstack/react-query"
import ErrorNetwork from "@/components/errorNetwork";
import moment from 'moment';
import { useParams } from 'next/navigation'
import { getData } from "@/app/utils/services";
import Basecontent from "@/components/basecontent";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from "next/link";
import { useEffect, useState } from "react";
import _ from "lodash"
import { urlMedia } from "@/app/utils/vars";

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};


function ContentDetail() {
    const [contentTitle, setContentTitle] = useState("")
    const pathname = useParams()
    const getQuery = async () => {
        return await getData(`/campaigns/${pathname.slug}?populate=*`)
    }
    const query = useQuery({
        queryKey: ["campaignDetail"],
        queryFn: getQuery
    })
    const getQuery2 = async () => {
        return await getData(`/transactions?populate=*&filters[transaction_status]=settlement`)
    }
    const query2 = useQuery({
        queryKey: ["transactions"],
        queryFn: getQuery2
    })
    const dataContent = query.data?.data.data
    const dataDonasi = query2.data?.data.data
    const currentDonasi = _.filter(dataDonasi, (item) => item.attributes.product === dataContent?.attributes.title);
    const totalCurrentDonation = _.sum(_.map(currentDonasi, (item) => parseInt(`${item.attributes.gross_amount}`)));
    const target = dataContent?.attributes?.target_total_donate
    const persentase = (parseInt(`${totalCurrentDonation}`) / parseInt((`${target}`))) * 100
    //rumus: persentase_terkumpul = (terkumpul / target_nilai) * 100

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
        <div className="wrapper">
            <div className="relative justify-between">
                <div>
                    <div className="sliderdetail mb-7 mx-auto">
                        {
                            dataContent?.attributes.mainimage.data ?
                                <Slider {...settings}>
                                    {
                                        dataContent?.attributes.mainimage.data.map((item: any) => {
                                            return (
                                                <div key={item.id}><Image src={urlMedia + item.attributes.url} alt={item.attributes.name} width={item.attributes.width} height={item.attributes.height} className="mx-auto" />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider> : null
                        }

                    </div>
                </div>
                <div className="relative pt-7">
                    <h1 className="text-5xl relative pb-3 mb-7
                        after:content-[''] after:w-[50px] after:h-[5px] after:bg-main-c after:absolute after:left-0 after:bottom-0
                    ">
                        {dataContent?.attributes.title}
                    </h1>
                    <h5 className="opacity-50">Di Publish: {moment(`${dataContent?.attributes.publishedAt}`).format('DD MMMM YYYY')}</h5>
                    <div className="relative min-h-[500px] flex gap-9 lg:flex-row flex-col">
                        <div className="lg:w-8/12">
                            {parse(`${dataContent?.attributes.content}`)}
                        </div>
                        <div className="lg:w-4/12">
                            <div className="sticky top-[100px] shadow p-7">
                                <h4 className="font-bold text-2xl">Salurkan Donasi {dataContent?.attributes.title} Melalui Sidrat Alamal Jaya</h4>
                                <div className="relative my-10">

                                    <div className="text-sm mb-1">Terkumpul: {(parseInt(`${totalCurrentDonation}`)).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
                                    <div className="w-full bg-green-50 h-[10px] rounded-lg relative border-main-c border-solid border overflow-hidden">
                                        <div className={`absolute left-0 h-[10px] bg-main-c`} style={{ width: `${persentase}%` }}></div>
                                    </div>
                                    <div className="absolute text-[10px] left-[40%]">{_.round(parseFloat(`${persentase}`), 3)}%</div>
                                    <div className="bg-gray-c p-7 mt-7">
                                        <h4 className="font-bold">Info:</h4>
                                        <div className="text-sm mb-1">Target: {(parseInt(`${dataContent?.attributes.target_total_donate}`)).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
                                        <div className="text-sm mb-1">Total Donator: {currentDonasi?.length}</div>
                                    </div>
                                    <Link href="/donate" className="btn mt-5 hidden lg:inline-block ">Donasi Sekarang</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link href="/donate" className="btn mt-5 block fixed z-10 bottom-0 w-full left-0 rounded-none text-center lg:hidden" style={{ padding: "17px 8px " }}>Donasi Sekarang</Link>

        </div>
    )
}

export default function DetailPage() {
    return (
        <div>
            <Basecontent>
                <ContentDetail />
            </Basecontent>
        </div>
    )
}
