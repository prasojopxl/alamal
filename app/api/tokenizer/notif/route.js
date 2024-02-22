import midtransClient from "midtrans-client";
import {NextResponse} from "next/server"
import axios from "axios"

const keyApi2 = process.env.KEY_API2
const config2 = {
    headers: {
        'Authorization': 'Bearer ' + keyApi2
    }
}


let apiClient = new midtransClient.Snap({
    isProduction: true,
    serverKey: process.env.NEXT_PUBLIC_SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function GET() {
    return NextResponse.json("hello")
}


export async function POST(req) {
    const body = await req.json()

    apiClient.transaction.notification()
    const dataById = await axios.get(`https://adm.stagingaja.com/api/transactions?filters[order_id]=${body.order_id}`,config2)
    .then(res=> {
        return res.data.data[0].id
    })



    await axios.put(`https://adm.stagingaja.com/api/transactions/${dataById}`, {
        data: {
            dataku: body,
            payment_type:body.payment_type,
            gross_amount:body.gross_amount,
            transaction_status:body.transaction_status,

        }
    }, config2).then((res) => {
        console.log("Ok...")
    }).catch((error) => {
        console.log("ini error di sini",error)
    })

    
    return NextResponse.json("ok")
}