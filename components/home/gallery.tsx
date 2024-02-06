"use client"
import React from 'react'
import Image from "next/image";
import { useQuery } from "@tanstack/react-query"
import ErrorNetwork from "../errorNetwork";
import { getData } from "@/app/utils/services";
import parse from "html-react-parser";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function Gallery() {
    const getQuery = async () => {
        return await getData("/galleries?populate=*")
    }
    const query = useQuery({
        queryKey: ["galleries"],
        queryFn: getQuery
    })
    if (query.isLoading) {
        return (
            <div className=" relative flex justify-center ">
                <div className="animate-pulse w-full">
                    <div className="rounded-sm bg-slate-200 h-[200px] w-full "></div>
                </div>
            </div>
        )
    }

    if (query.isError) {
        return (
            <ErrorNetwork />
        )
    }

    const contentData = query.data?.data.data
    return (
        <div>
            {
                contentData.length > 0 ?
                    <div className="wrapper lg:py-16">
                        <h3 className="text-3xl font-bold text-center mb-5">Gallery <span className="text-orange-c">Kami</span></h3>
                        <div className="flex flex-wrap -mx-3 justify-center">
                            {
                                contentData.map((item: any) => {
                                    return (
                                        <div className="p-3 lg:w-3/12 w-full" key={item.id}>
                                            <div className="p-2 bg-slate-100 rounded-lg">
                                                <Dialog>
                                                    <DialogTrigger className="hover:opacity-80">
                                                        <div className="w-full h-[170px] flex justify-center ">
                                                            <Image src={`${process.env.URL_MEDIA}${item.attributes.image.data.attributes.url}`} width={item.attributes.image.data.attributes.width} height={item.attributes.image.data.attributes.height} alt="image" />
                                                        </div>
                                                        <div className="p-3 text-lg text-center capitalize">{item.attributes.title}</div>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <div className="capitalize mb-3 text-2xl">{item.attributes.title}</div></DialogTitle>
                                                            <DialogDescription>
                                                                <Image src={`${process.env.URL_MEDIA}${item.attributes.image.data.attributes.url}`} width={item.attributes.image.data.attributes.width} height={item.attributes.image.data.attributes.height} alt="image" />
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>

                                    )
                                })
                            }


                        </div>
                    </div> : null
            }

        </div>
    )
}
