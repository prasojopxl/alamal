import Midtrans from "midtrans-client";
import {NextResponse} from "next/server"
import axios from "axios"

const keyApi2 = process.env.KEY_API2
const config2 = {
    headers: {
        'Authorization': 'Bearer ' + keyApi2
    }
}


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
    const updateData = await axios.post("https://adm.stagingaja.com/api/transactions", config2,{
        method: "POST",
        data: {
            dataku: body
        }
    }).then((res) => res.data)
    
    const dataku = await updateData

    console.log({dataku})
    return NextResponse.json(body)
}