import React from 'react'
import Link from "next/link"
import Image from "next/image"

export default function ItemCampign(props: any) {
    const setLocalStorage = (productName: string) => {
        localStorage.setItem('productCampaign', productName);
    }

    return (
        <Link href={props.link ? props.link : "/"} className="lg:w-4/12 w-full p-3">
            <div className="rounded-[10px] bg-white overflow-hidden border-[#DEE3EB] border-solid border-[1px]" onClick={() => setLocalStorage(props.title)}>
                <div className="relative w-[369px] h-[229px] overflow-hidden mx-auto">
                    <Image src={`${props.image}`} alt="" fill />
                </div>
                <div className="p-5">
                    <h5 className="uppercase text-c-green font-medium text-[16px]">{props.category}</h5>
                    <h4 className="font-bold text-[24px] line-clamp-2 clamp-hack max-h-[70px]">{props.title}</h4>
                    <div className="mt-0 line-clamp-3 clamp-hack [&_p]:mt-2 overflow-hidden max-h-[85px]">{props.description}</div>
                </div>
            </div>
        </Link>
    )
}

function Item(props: any) {

}

