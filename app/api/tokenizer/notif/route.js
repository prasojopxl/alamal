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
    axios.post("https://adm.stagingaja.com/api/transactions", {
        data: {
            dataku: body
        }
    }, config2).then((res) => res.data)
    
    // console.log({dataku})
    return NextResponse.status(200).json(body)
}