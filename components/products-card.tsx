"use client";

import Image from "next/image";
import Cardbutton from "@/components/card-button";
import { product, UseDashboardContext } from "@/context/DashboardContext";
import { useEffect, useState } from "react";

const ProductCard = ({ products }: { products: product[] }) => {
  const { category } = UseDashboardContext();
  const [filteredProducts, setFilterProducts] = useState(products);

  useEffect(() => {
    setFilterProducts(() => {
      return category.length > 0
        ? products.filter((product) => category.includes(product.category))
        : products;
    });
  }, [category, products]);

  return (
    <>
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl p-3 shadow-md flex flex-col justify-between"
        >
          <div className="relative aspect-square mb-2">
            <Image
              src={`/${product.image}`}
              alt="Food Image"
              className="rounded-xl"
              fill
              sizes="500px"
            ></Image>
          </div>
          <div className="mb-4 flex-auto">{product.name}</div>
          <div className="flex justify-between items-center">
            <div className="font-bold">
              {`Rp ${product.price
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}
            </div>
            <Cardbutton {...product} />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
