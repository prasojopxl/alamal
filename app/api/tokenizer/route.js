import Midtrans from "midtrans-client";
import {NextResponse} from "next/server"
import axios from "axios"

let snap = new Midtrans.Snap({
    isProduction: true,
    serverKey: process.env.NEXT_PUBLIC_SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

const keyApi2 = process.env.KEY_API2
const config2 = {
    headers: {
        'Authorization': 'Bearer ' + keyApi2
    }
}


export async function GET() {
    return NextResponse.json("hello")
}


export async function POST(req) {
    const {id, productName, price, fullname, email} = await req.json()
    let parameter = {
        item_details: {
            name: productName,
            price: price,
            quantity: 1
        },
        transaction_details: {
            order_id:id,
            gross_amount: price
        },
        customer_details: {
            first_name: fullname,
            email: email,            
        }
    }
    await axios.post(`https://adm.stagingaja.com/api/transactions`,{
        data: {
            product: productName,
            customer_name:fullname,
            email:email,
            order_id:id,
            transaction_status:"pending"
            // gross_amount:price

        }
    },config2).then((res) => {
        console.log("okkk")
    }).catch((error) => {
        console.log("error")
    })

    const token = await snap.createTransactionToken(parameter)
    return NextResponse.json(token)
}