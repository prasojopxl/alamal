"use client"
import axios from "axios"
import React from 'react'
import _ from "lodash";
import { useEffect } from "react";

interface iDonate {
    id: number
    productName: string
    price: number
    fullname: string
    email: string
}

declare global {
    interface Window {
        snap: any;
    }
}
export default function Donate() {

    const donatenow = async () => {
        const data: iDonate = {
            id: _.random(1, 9999) + _.now(),
            productName: "Membangun Masjid",
            price: 400000,
            fullname: "Sapto Putra",
            email: "Jp2P1@example.com"
        }
        const response = await axios.post("/api/tokenizer", data)
        window.snap.pay(response.data)
    }
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
        <div className="wrapper">
            <div className="max-w-[800px] mx-auto my-7 shadow-lg p-7 rounded">
                <h1 className="text-center mb-7">Donasi Pembangunan Masjid</h1>
                <h4 className="mt-3">Nama</h4>
                <input type="text" className="border px-3 py-1 w-full" />
                <h4 className="mt-3">Email</h4>
                <input type="email" className="border px-3 py-1 w-full" />
                <h4 className="mt-3">Nominal</h4>
                <input type="number" className="border px-3 py-1 w-full" />
                <h4 className="mt-5">Pesan/Doa/Harapan</h4>
                <textarea className="border px-3 py-1 w-full min-h-[150px]" />
                <button className="bg-orange-c text-white w-full mt-5 py-2 rounded" onClick={donatenow}>Donasi</button>
            </div>
        </div>
    )
}
