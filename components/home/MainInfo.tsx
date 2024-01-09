import Image from "next/image"
import { MdOutlineJoinFull, MdDisplaySettings } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";


function ItemInfo(props: any) {
    return (
        <div>
            <div className={`p-7 text-center ${props.bgcolor}`}>
                <h5 className="font-light">Key Feature</h5>
                <h3 className="text-3xl font-bold">{props.title}</h3>
                <div className="flex justify-center items-center py-3">{props.icon}</div>
                <p>Adipisci cupiditate ab distinctio obcaecati, ducimus, est voluptas aliquid expedita eos quo</p>
            </div>
        </div>
    )
}
export default function MainInfo() {
    return (
        <div className="wrapper">
            <div className="flex justify-between gap-7 mt-24 mb-24">
                <ItemInfo bgcolor="bg-pink-c" title="Tata Kelola" icon={<MdDisplaySettings className="text-[200px] text-orange" />} />
                <ItemInfo bgcolor="bg-blue-c" title="Rekening Zakat" icon={<TbMoneybag className="text-[200px] text-orange" />} />
                <ItemInfo bgcolor="bg-gray-c" title="Mitra Kami" icon={<MdOutlineJoinFull className="text-[200px] text-orange" />} />
            </div>
        </div>
    )
}
