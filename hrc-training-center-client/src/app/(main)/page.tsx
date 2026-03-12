"use client";
import LandingBox from "@/components/main/main-page/LandingBox";
import ReasonBox from "@/components/main/main-page/ReasonBox";
import SuggestBox from "@/components/main/main-page/SuggestBox";
import { Divide } from "lucide-react";

const MainPage = () => {
  return (
    <div className="flex flex-col my-1">
      <LandingBox />
      <div className="w-full border border-gray-300 my-10"></div>
      <ReasonBox className="bg-white" />
      <div className="w-full border border-gray-300 my-10"></div>
      <SuggestBox />
    </div>
  );
};

export default MainPage;
