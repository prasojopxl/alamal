import { NextResponse} from "next/server"
import axios from "axios"

export async function GET(req,res) {
    console.log(req.nextUrl.pathname)
    return NextResponse.json("hello")
}
