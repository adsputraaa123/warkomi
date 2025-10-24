"use client";

import { cart } from "@/context/DashboardContext";
import { useEffect, useState } from "react";

const Details = () => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    setCart(JSON.parse(sessionStorage.getItem("cart") || ""));
    setPrice(sessionStorage.getItem("price") || "");
  }, []);

  return (
    <div className="border-1 border-gray-300 rounded-xl p-5">
      <div className="text-xl font-semibold">Your Order Details</div>
      <hr className="text-gray-300 my-2" />
      <div>
        {cart.map((item: cart) => (
          <div
            key={item.product.id}
            className="sm:flex sm:justify-between sm:items-center mb-2"
          >
            <div className="text-gray-500">{`${item.product.name} (x${item.quantity})`}</div>
            <div className="text-gray-500 font-semibold">{`Rp ${(item.product.price * item.quantity).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</div>
          </div>
        ))}
      </div>
      <hr className="text-gray-300 mt-2 mb-4" />
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Total Due</div>
        <div className="text-xl font-semibold text-orange-800">{`Rp ${price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</div>
      </div>
    </div>
  );
};

export default Details;
