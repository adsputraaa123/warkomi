"use client";

import React from "react";
import { product, UseDashboardContext } from "@/context/DashboardContext";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";

const Cardbutton = (product: product) => {
  const { addToCart } = UseDashboardContext();

  return (
    <button
      className="rounded-full p-1 bg-black hover:cursor-pointer"
      onClick={() => {
        addToCart(product);
        toast.dismiss();
        toast.success("Added to cart", {
          icon: "🟢",
          duration: 1000,
          style: {
            border: "2px solid #B4E50D",
          },
        });
      }}
    >
      <Plus color="white" />
    </button>
  );
};

export default Cardbutton;
