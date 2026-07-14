"use client";
import BannerBox from "@/components/main/main-page/BannerBox";
import IntroductBox from "@/components/main/main-page/IntroduceBox";

const MainPage = () => {
  return (
    <div className="flex flex-col my-1">
      <div className="w-full max-w-[2560px] mx-auto">
        <BannerBox />
      </div>
      <div className="w-full max-w-[2560px] mx-auto">
        <IntroductBox />
      </div>
    </div>
  );
};

export default MainPage;
