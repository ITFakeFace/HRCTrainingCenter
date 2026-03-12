"use client";

import Image from "next/image";
import React from "react";
import LogoCropped from "@/assets/LogoCropped.jpg";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const alertTrigger = (name: string) => {
    alert(name);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="flex items-center justify-between p-4 shadow-md px-10 font-sans">
          <div>
            <Image src={LogoCropped} alt="Logo" width={125} />
          </div>
          <div className="flex flex-row justify-between gap-5">
            <button
              className={styles.navigationItems}
              onClick={() => alertTrigger("Khoá học")}
            >
              Khoá học
            </button>
            <button
              className={styles.navigationItems}
              onClick={() => alertTrigger("Tài liệu")}
            >
              Tài liệu
            </button>
            <button
              className={styles.navigationItems}
              onClick={() => alertTrigger("Tuyển dụng")}
            >
              Tuyển dụng
            </button>
          </div>
        </div>
      </header>
      <main className="grow">{children}</main>
      <footer className="p-4 text-center text-lg text-gray-200 bg-primary">
        THis is footer
      </footer>
    </div>
  );
};

const styles = {
  navigationItems:
    "text-lg font-bold text-primary-faded hover:text-primary transition-colors duration-300",
};

export default MainLayout;
