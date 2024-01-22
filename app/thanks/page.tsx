"use client"
import React from 'react'
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Thanks() {
    const status: any = useSearchParams()
    return (
        <div className="wrapper py-10 flex justify-center items-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Terima Kasih...</h1>
                <h4>Transaksi id anda: {status.get("order_id")}</h4>
                {status.transaction_status}
                {
                    status.get("transaction_status") !== "settlement" ?
                        <h4 className="text-xl">Silahkan cek email anda dan melakukan pembayaran</h4> :
                        <h4 className="text-xl">Donasi Anda Telah Kami Terima</h4>
                }

            </div>
        </div>
    )
}
