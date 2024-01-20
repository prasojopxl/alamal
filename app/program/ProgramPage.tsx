"use client"
import { useQuery } from "@tanstack/react-query"
import { getDataOpen } from "../utils/services"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";
import Basecontent from "@/components/basecontent"
import Image from "next/image"
import { urlMedia } from "../utils/vars"

function ProgramContent() {
    const getQuery = async () => {
        return await getDataOpen("/posts/2?populate=*")
    }
    const query = useQuery({
        queryKey: ["program"],
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


    const dataContent = query.data?.data.data.attributes?.content
    const dataImage = query.data?.data.data.attributes?.main_image
    return (
        <div>
            {
                dataImage?.data ? <div className="relative w-full">
                    <Image src={urlMedia + dataImage?.data?.attributes?.url} width={dataImage?.data?.attributes?.width} height={dataImage?.data?.attributes?.height} alt="image" />
                </div> : null
            }
            <div className="max-w-[1000px] mx-auto [&_ol]:list-decimal">
                {parse(`${dataContent}`)}
            </div>
        </div>
    )
}
export default function ProgramPage() {

    return (
        <div>
            <Basecontent>
                <ProgramContent />
            </Basecontent>
        </div>
    )
}
