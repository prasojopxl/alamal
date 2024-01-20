import { BiSolidError } from "react-icons/bi";

export default function ErrorNetwork() {
    return (
        <div className="relative flex justify-center p-5 bg-gray-c w-full my-7 gap-1 items-center wrapper "><BiSolidError className="text-yellow-500" /> Data Not Found</div>
    )
}
