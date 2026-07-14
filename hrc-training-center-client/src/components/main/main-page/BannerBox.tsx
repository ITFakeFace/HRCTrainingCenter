import { Carousel } from "primereact/carousel";
import Logo from "@/assets/images/logo/Logo.jpg";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import styles from "./HomeBannerCarousel.module.scss";
const BannerBox = () => {
  const [items, setItems] = useState<StaticImageData[]>([Logo, Logo, Logo]);
  const renderCarouselItem = (item: StaticImageData) => {
    return (
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={item}
          alt="Banner"
          fill
          priority
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover"
        />
      </div>
    );
  };
  return (
    <div className={styles.carouselContainer}>
      <Carousel
        value={items}
        numVisible={1}
        numScroll={1}
        className="w-full h-full"
        itemTemplate={renderCarouselItem}
        circular
        autoplayInterval={3000} // Tự động chuyển slide (3 giây)
        showIndicators={true} // Hiển thị các dấu chấm chỉ số (tùy chọn)
        showNavigators={true} // Bắt buộc bật để hiển thị nút
      />
    </div>
  );
};

export default BannerBox;
