"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import { access } from "fs";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCartProps {
  data: any;
}

const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
    const router = useRouter();

    const productRating =
    data.reviews.reduce((acc: number, item: any) => 
            item.rating + acc, 0) / data.reviews.length;

  return (
    <div
    onClick={() => {router.push(`/product/${data.id}`)
    window.alert("i am clicked")}}
      className="col-span-1 cursor-pointer border-[1.2px] border-red-700 bg-slate-50 rounded-sm p-[20px]
        transition hover:scale-105 text-center text-sm "
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            className="w-full h-full object-contain"
            src={data.images[0].image}
            alt={data.name}
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCart;
