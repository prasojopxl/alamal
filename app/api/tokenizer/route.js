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

    const token = await snap.createTransactionToken(parameter)
    console.log({token})
    return NextResponse.json(token)
}