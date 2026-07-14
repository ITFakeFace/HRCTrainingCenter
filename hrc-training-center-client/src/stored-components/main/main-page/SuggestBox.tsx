"use client";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import Image from "next/image";
import Logo from "@/assets/Logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ClassCarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price?: number | null;
}

const SuggestBox = ({ className }: { className?: string }) => {
  const classList: ClassCarouselItem[] = [
    {
      id: 1,
      title: "Lớp Kỹ năng mềm",
      description: "Học cách giao tiếp hiệu quả và quản lý thời gian.",
      image: "https://via.placeholder.com/300x200?text=Kỹ+năng+mềm",
    },
    {
      id: 2,
      title: "Lớp Lập trình cơ bản",
      description:
        "Học các ngôn ngữ lập trình phổ biến như Python và JavaScript.",
      image: "https://via.placeholder.com/300x200?text=Lập+trình+cơ+bản",
    },
    {
      id: 3,
      title: "Lớp Thiết kế đồ họa",
      description:
        "Học cách sử dụng các công cụ thiết kế như Photoshop và Illustrator.",
      image: "https://via.placeholder.com/300x200?text=Thiết+kế+đồ+họa",
    },
  ];
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const classTemplate = (item: ClassCarouselItem) => {
    return (
      <div className="group relative w-4/5 mx-auto border rounded-lg overflow-hidden shadow-sm bg-white pb-3 cursor-pointer transition-all duration-300 hover:shadow-md">
        {/* OVERLAY PHỦ TOÀN BỘ CARD */}
        <div
          className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center 
                      opacity-0 group-hover:opacity-100! transition-all duration-300"
        >
          <div className="text-white flex items-center gap-2 font-bold text-2xl">
            Xem chi tiết
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="relative z-0 flex flex-col gap-3">
          <div className="relative w-full h-60 overflow-hidden">
            <Image
              src={Logo}
              alt="Hình ảnh lớp học"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="text-center mx-1 text-secondary">
            <div className="font-bold text-2xl text-primary truncate">
              {item.title}
            </div>
          </div>

          <div className="mx-5">
            <div className="text-primary-faded text-justify text-lg line-clamp-3">
              {item.description}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${className} flex flex-col items-center gap-8 bg-white w-full text-primary py-20`}
    >
      <div className="text-6xl font-bold text-primary">
        Các lớp sắp khai giảng
      </div>
      <div className="w-full">
        <Carousel
          value={classList}
          numVisible={3}
          itemTemplate={classTemplate}
          autoplayInterval={5000}
          circular
          showIndicators={false}
          responsiveOptions={responsiveOptions}
        />
      </div>
    </div>
  );
};

export default SuggestBox;
