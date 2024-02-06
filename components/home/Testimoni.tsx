"use client"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from "next/image";
import { useQuery } from "@tanstack/react-query"
import ErrorNetwork from "../errorNetwork";
import { getData } from "@/app/utils/services";
import parse from "html-react-parser";


export default function Testimoni() {
    const getQuery = async () => {
        return await getData("/testimonis?populate=*")
    }
    const query = useQuery({
        queryKey: ["testimoni"],
        queryFn: getQuery
    })
    if (query.isLoading) {
        return (
            <div className=" relative flex justify-center ">
                <div className="animate-pulse w-full">
                    <div className="rounded-sm bg-slate-200 h-[200px] w-full "></div>
                </div>
            </div>
        )
    }

    if (query.isError) {
        return (
            <ErrorNetwork />
        )
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]

    };
    return (
        <>
            {
                query.data?.data.data.length > 0 ? <div className="wrapper py-24">
                    <div className="max-w-[700px] mx-auto">
                        <h3 className="text-3xl font-bold text-center mb-5">Apa Kata <span className="text-orange-c">Mereka?</span></h3>
                        <div className="w-full max-w-[500px] mx-auto">
                            <Slider {...settings}>
                                {
                                    query.data?.data.data.map((item: any) => {
                                        return (
                                            <div className="text-center max-w-[500px] mx-auto mb-5 " key={item.id}>
                                                <div className="flex justify-center items-center w-[100px] h-[100px] bg-gray rounded-full mx-auto overflow-hidden">
                                                    <Image src={`${item.attributes.image.data ? process.env.URL_MEDIA + item.attributes.image.data.attributes.url : "/images/no-image-square.jpg"}`} width={100} height={100} alt="image" />

                                                </div>
                                                <h4 className="mt-5 font-bold text-[20px]">{item.attributes.name && item.attributes.name}</h4>
                                                <h5 className="opacity-70"><i>{item.attributes.title && item.attributes.title}</i></h5>
                                                {item.attributes.description && parse(item.attributes.description)}
                                            </div>

                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
                    : null
            }
        </>
    )
}
