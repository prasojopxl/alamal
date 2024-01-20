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

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
};


function ContentDetail() {
    const pathname = useParams()
    const getQuery = async () => {
        return await getData(`/campaigns/${pathname.slug}?populate=*`)
    }
    const query = useQuery({
        queryKey: ["campaignDetail"],
        queryFn: getQuery
    })
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
    const dataContent = query.data?.data.data
    console.log(dataContent)
    return (
        <div className="wrapper">
            <div className="relative justify-between">
                <div>
                    <div className="sliderdetail mb-7">
                        <Slider {...settings}>
                            <div><Image src="/images/banner-img-1.jpg" alt="" width={1919} height={900} /></div>
                            <div><Image src="/images/banner-img-1.jpg" alt="" width={1919} height={900} /></div>
                            <div><Image src="/images/banner-img-1.jpg" alt="" width={1919} height={900} /></div>
                        </Slider>
                    </div>
                </div>
                <div className="relative pt-7">
                    <h1 className="text-5xl relative pb-3 mb-7
                        after:content-[''] after:w-[50px] after:h-[5px] after:bg-main-c after:absolute after:left-0 after:bottom-0
                    ">
                        {dataContent.attributes.title}
                    </h1>
                    <h5 className="opacity-50">Di Publish: {moment(`${dataContent.attributes.publishedAt}`).format('DD MMMM YYYY')}</h5>
                    <div className="relative min-h-[500px] flex gap-9">
                        <div className="w-8/12">
                            {parse(`${dataContent.attributes.content}`)}
                        </div>
                        <div className="w-4/12">
                            <div className="sticky top-[100px] shadow p-7">
                                <h4 className="font-bold text-2xl">Salurkan Donasi {dataContent.attributes.title} Melalui Sidrat Alamal Jaya</h4>
                                <div className="relative my-10">

                                    <div className="text-sm mb-1">Terkumpul: {(100000).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
                                    <div className="w-full bg-green-50 h-[10px] rounded-lg relative border-main-c border-solid border overflow-hidden">
                                        <div className="absolute left-0 h-[10px] w-[40%] bg-main-c"></div>
                                    </div>
                                    <div className="absolute text-[10px] left-[40%]">40%</div>
                                    <div className="bg-gray-c p-7 mt-7">
                                        <h4 className="font-bold">Info:</h4>
                                        <div className="text-sm mb-1">Target: {(dataContent.attributes.target_total_donate).toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</div>
                                        <div className="text-sm mb-1">Total Donator: 50</div>
                                    </div>
                                    <Link href="/donate" className="btn mt-5 inline-block">Donasi Sekarang</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
