"use client"
import { useQuery } from "@tanstack/react-query"
import { getData, getDataOpen } from "../utils/services"
import Basecontent from "@/components/basecontent"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";
import { urlMedia } from "../utils/vars"
import ItemCampign from "./ItemCampign"

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
            <div className="wrapper relative flex justify-center ">
                <div className="animate-pulse flex justify-between gap-7 mb-24 lg:flex-row flex-col w-full">
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

    const dataContent = query.data?.data

    console.log(dataContent?.data)
    return (
        <div>
            <div className="flex flex-wrap -mx-3">
                {
                    query.isSuccess ? dataContent?.data?.map((item: any) => {
                        return (
                            <ItemCampign key={item.id}
                                link={`/campaign/${item.id}`}
                                image={item.attributes.mainimage ? urlMedia + item.attributes.mainimage.data[0].attributes?.url : "/images/donate-image.jpg"}
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
