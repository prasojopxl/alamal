"use client"
import { useQuery } from "@tanstack/react-query"
import { getData, getDataSelf } from "../../utils/services"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";
import Basecontent from "@/components/basecontent"
import Image from "next/image"
import { urlMedia } from "../../utils/vars"
import { useParams } from 'next/navigation'

function PageContent() {
    const pathname = useParams()
    const getQuery = async () => {
        return await getDataSelf(`/api/salamal?otherpage=${pathname.slug}`)
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


    const dataContent = query.data?.data.attributes
    const dataImage = query.data?.data.attributes?.image
    console.log(dataContent)
    return (
        <div>
            <div className="relative bg-main-c w-full h-[200px] flex justify-center items-center mb-14">
                <div className="absolute text-[200px] text-white opacity-20"></div>
                <h1 className="text-white text-5xl font-bold relative mx-3">{dataContent?.title}</h1>
            </div>

            {
                dataImage?.data ? <div className="relative wrapper w-full lg:mx-auto mx-2 text-center mb-5">

                    {
                        dataImage?.data ? <Image src={urlMedia + dataImage?.data?.attributes?.url} width={dataImage?.data?.attributes?.width} height={dataImage?.data?.attributes?.height} className="mx-auto" alt="image" />
                            : null
                    }
                </div> : null
            }
            <div className="max-w-[1000px] lg:mx-auto mx-3 [&_ol]:list-decimal">
                {parse(`${dataContent?.content}`)}
            </div>
        </div>
    )
}
export default function OtherPage() {

    return (
        <div>
            <Basecontent>
                <PageContent />
            </Basecontent>
        </div>
    )
}
