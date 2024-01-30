"use client"
import { useQuery } from "@tanstack/react-query"
import { getData, getDataOpen } from "../utils/services"
import Basecontent from "@/components/basecontent"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";
import Image from "next/image"
import { urlMedia } from "../utils/vars"
import Link from "next/link"

function CampaignContent() {
    const getQuery = async () => {
        return await getData("/campaigns?populate=*")
    }
    const query = useQuery({
        queryKey: ["campaign"],
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

    const setLocalStorage = (productName: string) => {
        localStorage.setItem('productCampaign', productName);
    }


    const dataContent = query.data?.data
    function Item(props: any) {
        return (
            <Link href={props.link ? props.link : "/blog/slug"} className="lg:w-4/12 w-full p-3">
                <div className="rounded-[10px] overflow-hidden border-[#DEE3EB] border-solid border-[1px]" onClick={() => setLocalStorage(props.title)}>
                    <div className="relative w-[369px] h-[229px] overflow-hidden mx-auto">
                        <Image src={`${props.image}`} alt="" fill />
                    </div>
                    <div className="p-5">
                        <h5 className="uppercase text-c-green font-medium text-[16px]">{props.category}</h5>
                        <h4 className="font-bold text-[24px] line-clamp-2 clamp-hack max-h-[70px]">{props.title}</h4>
                        <div className="mt-0 line-clamp-3 clamp-hack [&_p]:mt-2 overflow-hidden max-h-[85px]">{props.description}</div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <div>
            <div className="flex flex-wrap -mx-3">
                {
                    query.isSuccess ? dataContent?.data?.map((item: any) => {
                        return (
                            <Item key={item.id}
                                link={`/campaign/${item.id}`}
                                image={item.attributes.mainimage ? urlMedia + item.attributes.mainimage.data.attributes.url : "/images/donate-image.jpg"}
                                category="Donasi"
                                title={item.attributes.title}
                                description={parse(item.attributes.content)}
                            />
                        )
                    }) : null
                }
            </div>
        </div>
    )
}
export default function CampaignPage() {
    return (
        <div>
            <Basecontent>
                <CampaignContent />
            </Basecontent>
        </div>
    )
}
