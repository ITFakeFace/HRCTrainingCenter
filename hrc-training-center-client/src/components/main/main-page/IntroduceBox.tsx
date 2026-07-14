"use client";
import { Carousel } from "primereact/carousel";
import Logo from "@/assets/images/logo/Logo.jpg";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

const IntroductBox = () => {
  const [bannerItems, setBannerItems] = useState<StaticImageData[]>([
    Logo,
    Logo,
    Logo,
  ]);
  const renderBannerItem = (item: StaticImageData) => {
    return (
      <div className="w-full aspect-1920/135 flex items-center justify-center overflow-hidden bg-primary!">
        <Image
          src={Logo}
          alt="Banner"
          width={0}
          height={0}
          className="h-full w-auto object-contain mx-auto"
        />
      </div>
    );
  };
  return (
    <div className="w-full bg-primary! text-white">
      <div>
        <Carousel
          value={bannerItems}
          itemTemplate={renderBannerItem}
          className="w-full"
          showIndicators={false}
          showNavigators={false}
          autoplayInterval={3000}
          circular
          numVisible={1}
          numScroll={1}
        />
      </div>
      <div>
        <div className={`flex flex-row`}>
          <div className={`w-7/10 flex flex-col`}>
            <div className={`2xl:text-6xl`}>HRC TRAINING CENTER</div>
            <div className={`2xl:text-6xl`}>
              ĐỊNH VỊ TRỞ THÀNH "NGƯỜI ĐỒNG HÀNH"
            </div>  
            <div className={`2xl:text-3xl`}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo,
              quo culpa. Nobis sunt, aliquid laboriosam officia animi voluptate
              ad? Harum laborum sit aut vitae nisi ea odio voluptatum labore
              quaerat? Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Nemo, quo culpa. Nobis sunt, aliquid laboriosam officia animi
              voluptate ad? Harum laborum sit aut vitae nisi ea odio voluptatum
              labore quaerat? Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Nemo, quo culpa. Nobis sunt, aliquid laboriosam
              officia animi voluptate ad? Harum laborum sit aut vitae nisi ea
              odio voluptatum labore quaerat? Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Nemo, quo culpa. Nobis sunt, aliquid
              laboriosam officia animi voluptate ad? Harum laborum sit aut vitae
              nisi ea odio voluptatum labore quaerat?
            </div>
          </div>
          <div className={`w-3/10`}></div>
        </div>
      </div>
    </div>
  );
};
export default IntroductBox;
