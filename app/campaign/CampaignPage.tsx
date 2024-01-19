"use client"
import { useQuery } from "@tanstack/react-query"
import { getData, getDataOpen } from "../utils/services"
import Basecontent from "@/components/basecontent"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";
import Image from "next/image"
import { urlMedia } from "../utils/vars"

function CampaignContent() {
    const getQuery = async () => {
        return await getData("/campaigns?populate=*")
    }
    const query = useQuery({
        queryKey: ["about"],
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
    console.log(query.data)

    const dataContent = query.data?.data.data
    const dataImage = query.data?.data.data.attributes?.main_image
    console.log(dataContent)
    return (
        <div>
            <div className="flex flex-wrap -mx-3">
                {
                    dataContent?.map((item: any) => {
                        return (
                            <div className="w-6/12 p-3" key={item.id}>
                                <div className="shadow-lg w-full min-h-[300px] p-5 rounded-lg">
                                    <h2 className="text-3xl font-bold mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. </h2>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. A id, quas necessitatibus ipsa eaque quidem? Quas, harum in fugit veniam minus dolores, sunt rerum velit sapiente neque id, eius ducimus!
                                </div>
                            </div>

                        )
                    })
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
