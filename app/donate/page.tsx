"use client"
import axios from "axios"
import React from 'react'
import _, { values } from "lodash";
import { useEffect, useState } from "react";
import Basecontent from "@/components/basecontent";
import { useQuery } from "@tanstack/react-query"
import { getData, getDataOpen } from "../utils/services"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";
import { FcAbout } from "react-icons/fc";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface iDonate {
    id: string
    productName: string
    price: number | string
    fullname: string
    email: string
}

interface DonatorData {
    nama: string | null;
    email: string | null;
    nominal: number | string | null;
    productName: string | null;
}

declare global {
    interface Window {
        snap: any;
    }
}

const formSchema = z.object({
    name: z.string().min(3, {
        message: "Name minimal 3 characters.",
    }),
    email: z.string().email({
        message: "Email tidak valid.",
    }).min(5, {
        message: "Email minimal 5 characters.",
    }),
    nominal: z.string().min(4, {
        message: "nominal minimal 1k.",
    }).or(z.number().positive({
        message: "nominal minimal 1k.",
    })),

})

function Donate() {
    const [valNominal, setValNominal] = useState(0)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            nominal: valNominal,
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        const donatenow = async () => {
            const data: iDonate = {
                id: `${_.random(1, 9999) + _.now()}`,
                productName: `${localStorage.getItem("productCampaign")}`,
                price: parseInt(`${values.nominal}`),
                fullname: `${values.name}`,
                email: `${values.email}`
            }
            const response = await axios.post("/api/tokenizer", data)
            window.snap.pay(response.data)
        }
        donatenow()
    }



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

    const dataCampaign = query.data?.data.data

    return (
        <div className="wrapper">
            <Form {...form}>
                {
                    localStorage.getItem("productCampaign") ?
                        <div className="max-w-[800px] mx-auto my-7 shadow-lg p-7 rounded">
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="nominal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nominal (IDR / Rupiah)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Nominal" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <ul className="my-3 flex flex-wrap text-sm gap-2
                                             [&_li]:bg-slate-300 [&_li]:text-c-main [&_li]:rounded-full [&_li]:px-4 [&_li]:py-2 [&_li]:hover:cursor-pointer
                                         ">
                                    <li onClick={() => { form.setValue('nominal', 20000) }} className="hover:bg-orange-c hover:text-white">Rp. 20 k</li>
                                    <li onClick={() => { form.setValue('nominal', 50000) }} className="hover:bg-orange-c hover:text-white">Rp. 50 k</li>
                                    <li onClick={() => { form.setValue('nominal', 100000) }} className="hover:bg-orange-c hover:text-white">Rp. 100 k</li>
                                    <li onClick={() => { form.setValue('nominal', 500000) }} className="hover:bg-orange-c hover:text-white">Rp. 500 k</li>
                                    <li onClick={() => { form.setValue('nominal', 1000000) }} className="hover:bg-orange-c hover:text-white">Rp. 1.000 k</li>
                                </ul>
                                <h4 className="mt-3">Jenis Donasi</h4>
                                {
                                    localStorage.getItem("productCampaign") ?
                                        <div>
                                            <div className="bg-slate-100 text-main-c w-full mt-2 p-5 rounded">Anda akan mendonasikan ke <strong>{localStorage.getItem("productCampaign")}</strong></div>
                                            <div className="opacity-50 mt-1">Klik di <Link href="/campaign" className="underline font-bold text-c-main">sini</Link> untuk melihat atau mengubah jenis donasi anda</div>
                                        </div>
                                        :
                                        <div>
                                            <div className="text-red-500">Pilih jenis donasi terlebih dahulu</div>
                                        </div>
                                }

                                <Button type="submit" className="bg-orange-c text-white w-full mt-5 py-2 rounded">Submit</Button>
                            </form>
                        </div>
                        :
                        <div className="max-w-[800px] mx-auto my-7  p-7 rounded text-center">
                            <div className="flex flex-col items-center bg-slate-100 p-10 rounded">
                                <div className="text-[100px]"><FcAbout /></div>
                                <div className="text-red-500 text-ellipsis text-[30px]">Pilih jenis Campaign terlebih dahulu</div>
                                <Link href="/campaign">Klik disini dan pilih campaign</Link>
                            </div>
                        </div>
                }
            </Form>
        </div>
    )
}

export default function DonatePage() {
    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
        const script = document.createElement('script');
        const clientKey: any = process.env.NEXT_PUBLIC_CLIENT
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey)
        script.async = true
        document.body.appendChild(script)
        return () => {
            document.body.removeChild(script)
        }
    }, []);

    return (
        <Basecontent>
            <Donate />
        </Basecontent>
    )
}

