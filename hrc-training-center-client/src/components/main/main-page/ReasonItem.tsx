import Image, { StaticImageData } from "next/image";

const ReasonItem = ({
  className,
  image,
  title,
  description,
}: {
  className?: string;
  image: string | StaticImageData;
  title?: string;
  description?: string;
}) => {
  return (
    <div
      className={`${className} border rounded-3xl px-5 py-3 flex flex-row gap-2 items-center hover:transform hover:scale-105 transition-scale duration-300 shadow-md`}
    >
      <Image
        src={image}
        alt={title || "Reason item"}
        className="w-1/5 object-cover"
      />
      <div>
        <div className="text-2xl font-bold mt-2">{title ?? "Title"}</div>
        <p className="text-lg text-gray-600 mt-1">
          {description ??
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita quia eaque quisquam magnam aliquam ducimus maiores placeat odit veniam repudiandae, sequi animi voluptatibus cupiditate. Veniam modi ad aliquam repellat?"}
        </p>
      </div>
    </div>
  );
};

export default ReasonItem;
