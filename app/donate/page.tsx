"use client"
import axios from "axios"
import React from 'react'
import _ from "lodash";
import { useEffect, useState } from "react";
import Basecontent from "@/components/basecontent";
import { useQuery } from "@tanstack/react-query"
import { getData, getDataOpen } from "../utils/services"
import ErrorNetwork from "@/components/errorNetwork"
import parse from "html-react-parser";

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
function Donate() {
    const [dataDonator, setDataDonator] = useState<DonatorData>({
        nama: null,
        email: null,
        nominal: null,
        productName: "Membangun Masjid"
    })
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

    const donatenow = async () => {
        const data: iDonate = {
            id: `${_.random(1, 9999) + _.now()}`,
            productName: `${dataDonator.productName}`,
            price: parseInt(`${dataDonator.nominal}`),
            fullname: `${dataDonator.nama}`,
            email: `${dataDonator.email}`
        }
        const response = await axios.post("/api/tokenizer", data)
        window.snap.pay(response.data)
    }
    return (
        <div className="wrapper">
            <div className="max-w-[800px] mx-auto my-7 shadow-lg p-7 rounded">
                <h1 className="text-center mb-7">Donasi Pembangunan Masjid</h1>
                <h4 className="mt-3">Nama</h4>
                <input onChange={(e) => setDataDonator({ ...dataDonator, nama: e.target.value })} type="text" className="border px-3 py-1 w-full" />
                <h4 className="mt-3">Email</h4>
                <input onChange={(e) => setDataDonator({ ...dataDonator, email: e.target.value })} type="email" className="border px-3 py-1 w-full" />
                <h4 className="mt-3">Nominal</h4>
                <input onChange={(e) => setDataDonator({ ...dataDonator, nominal: e.target.value })} type="number" className="border px-3 py-1 w-full" />
                <h4 className="mt-3">Jenis Donasi</h4>
                <select onChange={(e) => setDataDonator({ ...dataDonator, productName: e.target.value })} className="border px-3 py-2 w-full">
                    {
                        dataCampaign.map((item: any) => {
                            return (
                                <option key={item.id} value={item.attributes.title}>{item.attributes.title}</option>

                            )
                        })
                    }
                </select>
                <button className="bg-orange-c text-white w-full mt-5 py-2 rounded" onClick={donatenow}>Donasi</button>
            </div>
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

