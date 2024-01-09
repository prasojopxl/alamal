import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ItemSlide() {
    return (
        <div className="text-center max-w-[500px] mx-auto mb-5">
            <div className="flex justify-center items-center w-[100px] h-[100px] bg-gray rounded-full mx-auto"></div>
            <h4 className="my-5">Muhammad Yassir</h4>
            <p>Adipisci cupiditate ab distinctio obcaecati, ducimus, est voluptas aliquid expedita eos quo</p>
        </div>
    )
}

export default function Testimoni() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]

    };

    return (
        <div className="wrapper py-24">
            <div className="max-w-[700px] mx-auto">
                <h3 className="text-3xl font-bold text-center mb-5">Apa Kata <span className="text-orange-c">Mereka?</span></h3>
                <Slider {...settings}>
                    <ItemSlide />
                    <ItemSlide />
                    <ItemSlide />
                    <ItemSlide />
                </Slider>
            </div>
        </div>
    )
}
