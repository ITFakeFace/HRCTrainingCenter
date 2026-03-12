import Image from "next/image";
import ReasonItem from "./ReasonItem";
import Logo from "@/assets/Logo.jpg";

const ReasonBox = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex flex-col items-center gap-8 w-full text-primary py-20 ${className}`}
    >
      <div className="text-5xl font-bold mb-20">Vì sao nên chọn HRC?</div>

      {/* Container chính: Đặt relative để các box con absolute theo nó */}
      <div className="relative flex justify-center items-center w-full max-w-7xl min-h-125">
        {/* HÌNH ẢNH Ở GIỮA */}
        <div className="z-10 shadow-2xl rounded-full overflow-hidden shadow-3xl">
          <Image
            src={Logo}
            alt="HRC Logo"
            width={400}
            height={400}
            className="object-cover z-0"
          />
        </div>

        {/* CÁC BOX XUNG QUANH */}

        {/* Box Trái - Sát cạnh TRÊN */}
        <ReasonItem
          className="absolute left-0 top-0 w-1/3 z-10 bg-pure-white"
          image={Logo}
          title="Uy tín"
          description="HRC có uy tín trong lĩnh vực đào tạo và phát triển nguồn nhân lực."
        />

        {/* Box Trái - Sát cạnh DƯỚI */}
        <ReasonItem
          className="absolute left-0 bottom-0 w-1/3 z-10 bg-pure-white"
          image={Logo}
          title="Chất lượng"
          description="Đảm bảo quy trình kiểm soát chất lượng đào tạo nghiêm ngặt."
        />

        {/* Box Phải - Cạnh GIỮA */}
        <ReasonItem
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 z-10 bg-pure-white"
          image={Logo}
          title="Chuyên nghiệp"
          description="Đội ngũ giảng viên chuyên môn cao, giàu kinh nghiệm thực chiến."
        />
      </div>
    </div>
  );
};

export default ReasonBox;
