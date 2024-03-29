"use client"
import Image from "next/image"
import { MdOutlineJoinFull, MdDisplaySettings } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import Basecontent from "../basecontent";
import { useQuery } from "@tanstack/react-query"
import ErrorNetwork from "../errorNetwork";
import { getData } from "@/app/utils/services";
import parse from "html-react-parser";


function ItemInfo(props: any) {
    return (
        <div className={`flex-1`} style={{ backgroundColor: `${props.bgcolor}` }}>
            <div className={`p-7 text-center`}>
                <h5 className="font-light">{props.subtitle}</h5>
                <h3 className="text-3xl font-bold mb-2">{props.title}</h3>
                <div className="flex justify-center items-center py-3 h-[250px] [&_img]:max-w-[220px] ">
                    <Image src={props.image} width={props.width} height={props.height} alt={props.title} className="max-w-[100%]" />
                </div>
                {props.children}
            </div>
        </div>
    )
}
export default function MainInfo() {
    const getQuery = async () => {
        return await getData("/main-infos?populate=*")
    }
    const query = useQuery({
        queryKey: ["maininfo"],
        queryFn: getQuery
    })
    if (query.isLoading) {
        return (
            <div className="wrapper relative flex justify-center ">
                <div className="animate-pulse flex justify-between gap-7 mt-24 mb-24 lg:flex-row flex-col w-full">
                    <div className="flex-1 rounded-sm bg-slate-200 h-[300px]"></div>
                    <div className="flex-1 rounded-sm bg-slate-200 h-[300px]"></div>
                    <div className="flex-1 rounded-sm bg-slate-200 h-[300px]"></div>
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
            <Basecontent>
                <div className="flex justify-between gap-7 mt-24 mb-24 lg:flex-row flex-col">
                    {
                        query.data?.data.data.map((item: any) => {
                            return (
                                <ItemInfo
                                    key={item.id}
                                    subtitle={item.attributes.sub_title}
                                    bgcolor={item.attributes.bg_color_class}
                                    title={item.attributes.title}
                                    image={`${item.attributes.image.data !== null ? process.env.URL_MEDIA + item.attributes.image.data?.attributes.url : "/images/no-image-square.jpg"}`}
                                    width={item.attributes.image.data !== null ? item.attributes.image.data?.attributes.width : 200}
                                    height={item.attributes.image.data !== null ? item.attributes.image.data?.attributes.height : 200}
                                >
                                    <div className="line-clamp-custom-6">{parse(`${item.attributes.shrot_description}`)}</div>
                                </ItemInfo>
                            )
                        })
                    }

                </div>
            </Basecontent>
        </div>
    )
}
