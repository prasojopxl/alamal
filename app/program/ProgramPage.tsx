"use client"
import { useQuery } from "@tanstack/react-query"
import { getDataOpen } from "../utils/services"
import Basecontent from "@/components/basecontent"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";

function ProgramContent() {
    const getQuery = async () => {
        return await getDataOpen("/posts/2")
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


    const dataContent = query.data?.data.data.attributes.content
    return (
        <div>{parse(dataContent)}</div>
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
