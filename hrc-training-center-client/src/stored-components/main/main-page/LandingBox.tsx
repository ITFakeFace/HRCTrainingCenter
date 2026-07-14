import Logo from "@/assets/Logo.jpg";
import Image from "next/image";
const LandingBox = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex flex-row items-stretch w-4/5 self-center ${className}`}
    >
      <div className="text-box  w-3/5 flex justify-end items-center">
        <div className="flex flex-col mr-30">
          <div className="text-5xl font-bold text-primary">
            Đào tạo chuyên nghiệp
          </div>
          <div className="text-5xl font-bold text-primary">Cùng HRC</div>
          <div className="text-xl text-gray-600 mt-2">
            Hệ thống đào tạo chuyên nghiệp cho nhân sự
          </div>
        </div>
      </div>
      <div className="image-box w-2/5">
        <Image
          src={Logo}
          alt="Logo"
          className="object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default LandingBox;
