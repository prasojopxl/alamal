
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import Image from "next/image";

function ItemSlide(props: any) {
    return (
        <div><Image src={props.image} width={1919} height={900} alt="image" /></div>
    )
}

export default function MainBanner() {
    function NextArrow(props: any) {
        const { onClick } = props;
        return (
            <div className="absolute z-10 cursor-pointer right-[10px] top-[50%] text-[30px] text-orange-c hover:text-c-green animate" onClick={onClick}>
                <BsFillArrowRightCircleFill />
            </div>
        )
    }

    function PrevArrow(props: any) {
        const { onClick } = props;
        return (
            <div className="absolute z-10 cursor-pointer left-[10px] top-[50%] text-[30px] text-orange-c hover:text-c-green animate" onClick={onClick}>
                <BsFillArrowLeftCircleFill />
            </div>
        )
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
        <div className="relative">
            <Slider {...settings}>
                <ItemSlide image="/images/img1.jpeg" />
                <ItemSlide image="/images/img2.jpeg" />
            </Slider>
        </div>
    )
}
