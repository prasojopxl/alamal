import {NextResponse} from "next/server"
import axios from "axios"

export async function GET(req,res) {
    const searchParams = new URLSearchParams(req.nextUrl.searchParams);
    const value = searchParams.get('otherpage'); // Mendapatkan nilai "1"
    const config = {
        headers: {
            'Authorization': 'Bearer ' + process.env.KEY_API
        }
    }
    
    const data = await axios.get(`https://adm.stagingaja.com/api/other-pages?filters[slug]=${value}&populate=*`, config)
    .then(res => {
        return res.data.data[0]
    })
    return NextResponse.json(data)
}
