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
import { FcAbout } from "react-icons/fc";
import Link from "next/link";

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
            {
                localStorage.getItem("productCampaign") ? <div className="max-w-[800px] mx-auto my-7 shadow-lg p-7 rounded">
                    <h1 className="text-center mb-7">Donasi</h1>
                    <h5>Silahkan isi form dibawah ini untuk melakukan donasi</h5>
                    <h4 className="mt-3">Nama</h4>
                    <input onChange={(e) => setDataDonator({ ...dataDonator, nama: e.target.value })} type="text" className="border px-3 py-1 w-full" />
                    <h4 className="mt-3">Email</h4>
                    <input onChange={(e) => setDataDonator({ ...dataDonator, email: e.target.value })} type="email" className="border px-3 py-1 w-full" />
                    <h4 className="mt-3">Nominal</h4>
                    <input onChange={(e) => setDataDonator({ ...dataDonator, nominal: e.target.value })} type="number" className="border px-3 py-1 w-full" value={`${dataDonator.nominal}`} />
                    <ul className="my-3 flex flex-wrap text-sm gap-2
                    [&_li]:bg-slate-300 [&_li]:text-c-main [&_li]:rounded-full [&_li]:px-4 [&_li]:py-2 [&_li]:hover:cursor-pointer
                ">
                        <li onClick={(e) => setDataDonator({ ...dataDonator, nominal: 20000 })} className="hover:bg-orange-c hover:text-white">Rp. 20 k</li>
                        <li onClick={(e) => setDataDonator({ ...dataDonator, nominal: 50000 })} className="hover:bg-orange-c hover:text-white">Rp. 50 k</li>
                        <li onClick={(e) => setDataDonator({ ...dataDonator, nominal: 100000 })} className="hover:bg-orange-c hover:text-white">Rp. 100 k</li>
                        <li onClick={(e) => setDataDonator({ ...dataDonator, nominal: 500000 })} className="hover:bg-orange-c hover:text-white">Rp. 500 k</li>
                        <li onClick={(e) => setDataDonator({ ...dataDonator, nominal: 1000000 })} className="hover:bg-orange-c hover:text-white">Rp. 1.000 k</li>
                    </ul>
                    <h4 className="mt-3">Jenis Donasi</h4>
                    {
                        localStorage.getItem("productCampaign") ?
                            <div>
                                <div className="bg-orange-c text-white w-full mt-2 p-5 rounded">Anda akan mendonasikan ke <strong>{localStorage.getItem("productCampaign")}</strong></div>
                                <div className="opacity-50 mt-1">Klik di <Link href="/campaign" className="underline font-bold text-c-main">sini</Link> untuk melihat atau mengubah jenis donasi anda</div>
                            </div>
                            :
                            <div>
                                <div className="text-red-500">Pilih jenis donasi terlebih dahulu</div>
                            </div>
                    }

                    {
                        (dataDonator.nama == null || dataDonator.nama == "") || (dataDonator.email == "" || dataDonator.email == null) || dataDonator.nominal == "" || dataDonator.nominal == null ?
                            <button className="bg-orange-c text-white w-full mt-5 py-2 rounded opacity-35 cursor-default">Donasi</button>
                            : <button className="bg-orange-c text-white w-full mt-5 py-2 rounded" onClick={donatenow}>Donasi</button>
                    }

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

