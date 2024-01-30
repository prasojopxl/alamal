"use client"
import { useQuery } from "@tanstack/react-query"
import { getDataOpen } from "../utils/services"
import Basecontent from "@/components/basecontent"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";
import Image from "next/image"
import { urlMedia } from "../utils/vars"

function AboutContent() {
    const getQuery = async () => {
        return await getDataOpen("/posts/1?populate=*")
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

    const dataContent = query.data?.data.data.attributes?.content
    const dataImage = query.data?.data.data.attributes?.main_image

    return (
        <div className="max-w-[1000px] mx-auto">
            {
                dataImage?.data ? <div className="relative w-full mx-auto text-center">
                    <Image src={urlMedia + dataImage?.data.attributes?.url} width={dataImage?.data.attributes?.width} height={dataImage?.data.attributes?.height} className="mx-auto" alt="image" />
                </div> : null
            }
            <div className="[&_h3]:bg-pink-c [&_h3]:p-3 [&_h3]:rounded [&_h3]:mt-[30px] [&_h3]:block
            [&_ol]:ml-4 [&_p]:first-letter:*:first-line:marker:text-main-c [&_p]:first-letter:text-main-c [&_p]:first-letter:font-bold [&_p]:first-letter:text-7xl [&_p]:first-letter:mr-2 &[_p]:first-letter:float-left 
            ">
                {parse(`${dataContent}`)}
            </div>
        </div>
    )
}
export default function AboutPage() {

    return (
        <div>
            <Basecontent>
                <AboutContent />
            </Basecontent>
        </div>
    )
}
