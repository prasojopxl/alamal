import Midtrans from "midtrans-client";
import {NextResponse} from "next/server"

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function GET() {
    return NextResponse.json("hello")
}


export async function POST(req) {
    const body = await req.json()
    console.log({body})
    return NextResponse.json(body)
}