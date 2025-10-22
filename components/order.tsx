"use client";

import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { cart, UseDashboardContext } from "@/context/DashboardContext";

const Order = (item: cart) => {
  const { addToCart, removeFromCart } = UseDashboardContext();

  return (
    <div className="flex mb-5">
      <div className="h-18 aspect-square relative mr-3">
        <Image
          src={`/${item.product.image}`}
          alt="Food Image"
          className="rounded-xl"
          fill
        ></Image>
      </div>
      <div className="flex flex-auto flex-col justify-between">
        <div className="flex-auto">{`${item.product.name}`}</div>
        <div className="flex justify-between font-bold items-center">
          <div>{`Rp ${item.product.price
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</div>
          <div className="flex items-center justify-between w-25">
            <button
              className="rounded-full bg-black p-1"
              onClick={() => {
                removeFromCart(item.product);
              }}
            >
              <Minus color="white" size={15} />
            </button>
            <div>{`${item.quantity}`}</div>
            <button
              className="rounded-full bg-black p-1"
              onClick={() => {
                addToCart({ ...item.product });
              }}
            >
              <Plus color="white" size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
