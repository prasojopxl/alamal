"use client"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import Image from "next/image";
import Basecontent from "../basecontent";
import { useQuery } from "@tanstack/react-query"
import ErrorNetwork from "../errorNetwork";
import { getData } from "@/app/utils/services";

function ItemSlide(props: any) {
    return (
        <div>
            {props.children}
            <Image src={props.image} width={1919} height={900} alt="image" />
        </div>
    )
}

export default function MainBanner() {
    const getQuery = async () => {
        return await getData("/main-banners?populate=*")
    }
    const query = useQuery({
        queryKey: ["banner"],
        queryFn: getQuery
    })
    if (query.isLoading) {
        return (
            <div className=" relative flex justify-center ">
                <div className="animate-pulse w-full">
                    <div className="rounded-sm bg-slate-200 h-[400px] w-full "></div>
                </div>
            </div>
        )
    }

    if (query.isError) {
        return (
            <ErrorNetwork />
        )
    }

    function NextArrow(props: any) {
        const { onClick } = props;
        return (
            <div className="absolute z-10 cursor-pointer right-[10px] top-[50%] text-[30px] text-orange-c hover:text-c-green animate" onClick={onClick}>
                <BsFillArrowRightCircleFill />
            </div>
        )
    }

    function PrevArrow(props: any) {
        const { onClick } = props;
        return (
            <div className="absolute z-10 cursor-pointer left-[10px] top-[50%] text-[30px] text-orange-c hover:text-c-green animate" onClick={onClick}>
                <BsFillArrowLeftCircleFill />
            </div>
        )
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
        <div className="relative">
            <Basecontent>
                <Slider {...settings}>
                    {
                        query.data?.data.data.map((item: any) => {
                            return (
                                <ItemSlide key={item.id} image={`${process.env.URL_MEDIA}${item.attributes.image.data.attributes.url}`} >
                                </ItemSlide>
                            )
                        })
                    }
                </Slider>
            </Basecontent>
        </div>
    )
}
