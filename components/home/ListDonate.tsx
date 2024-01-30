"use client"
import { useQuery } from "@tanstack/react-query"
import Basecontent from "@/components/basecontent"
import ErrorNetwork from "@/components/errorNetwork"
import { getData } from "@/app/utils/services"
import ItemCampign from "@/app/campaign/ItemCampign"
import { urlMedia } from "@/app/utils/vars"
import parse from "html-react-parser";
import _ from "lodash"

export default function ListDonate() {
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

    const dataContent = query.data?.data.data
    const dataContentRandom = _.sampleSize(dataContent, 3)
    return (
        <div className="bg-gray py-20">
            <div className="wrapper">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-3">Salurkan donasi dan amal pada program campaign kami</h2>
                    <p>Melalui campaign pilihan kami, anda dapat menyalurkan donasi yang kami sediakan</p>
                </div>
                <div className="flex justify-between gap-2 mt-9 max-w-[1000px] mx-auto lg:flex-row flex-col">
                    {
                        query.isSuccess ? dataContentRandom?.map((item: any) => {
                            return (
                                <ItemCampign key={item.id}
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
        </div>
    )
}
