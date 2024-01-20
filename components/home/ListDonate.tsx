function ItemProgram() {
    return (
        <div className="bg-orange-c text-white p-5 min-h-[300px] w-full text-center rounded-lg">
            <h4 className="text-2xl font-bold mb-3">Program</h4>
            <p>Adipisci cupiditate ab distinctio obcaecati, ducimus, est voluptas aliquid expedita eos quo</p>
        </div>
    )
}
export default function ListDonate() {
    return (
        <div className="bg-gray py-20">
            <div className="wrapper">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-3">Salurkan donasi dan amal pada program kami</h2>
                    <p>Melalui program pilihan kami, anda dapat menyalurkan donasi dan amal untuk program yang kami sediakan</p>
                </div>
                <div className="flex justify-between gap-7 mt-9 max-w-[1000px] mx-auto lg:flex-row flex-col">
                    <ItemProgram />
                    <ItemProgram />
                    <ItemProgram />
                </div>
            </div>
        </div>
    )
}
