"use client";

import { UseDashboardContext } from "@/context/DashboardContext";
import { useRouter, useSearchParams } from "next/navigation";
import { createOrder } from "@/actions/actions";
import toast from "react-hot-toast";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const Cart = () => {
  const router = useRouter();
  const [disable, setDisable] = useState(false);
  const {
    cart,
    price,
    pressCart,
    pressFilter,
    removeFromCart,
    addToCart,
    setPressCart,
    setPressFilter,
  } = UseDashboardContext();

  const params = useSearchParams();
  const tableId = params.get("id") ?? "null";

  useEffect(() => {
    const product = document.getElementById("product");

    if (product) {
      if (pressCart || pressFilter) {
        product.classList.add("blur-sm");
        document.body.style.overflow = "hidden";
      } else {
        product.classList.remove("blur-sm");
        document.body.style.overflow = "";
      }
    }
  }, [pressCart, pressFilter]);

  return (
    <>
      <button
        className="relative z-1 hover:cursor-pointer"
        onClick={() => {
          setPressCart(!pressCart);
          setPressFilter(false);
        }}
      >
        <ShoppingCart />
        <div className="absolute bg-red-400 rounded-full w-4 bottom-4 left-4 text-xs">
          {cart.length}
        </div>
      </button>
      <div
        className={`${
          pressCart ? "opacity-100 visible" : "invisible opacity-0"
        } transition-all duration-250 h-dvh flex flex-col absolute top-0 right-0 w-full sm:w-130 p-5 pt-21`}
      >
        <div className="shadow-md bg-white h-full rounded-xl flex flex-col flex-auto p-3">
          <Suspense>
            <div className="font-bold text-xl">{`Table ${params.get(
              "id"
            )}`}</div>
          </Suspense>
          <div className="flex-auto no-scrollbar overflow-auto my-3">
            {cart.map((item) => (
              <div key={item.product.id} className="flex mb-5">
                <div className="h-18 aspect-square relative mr-3">
                  <Image
                    src={`/${item.product.image}`}
                    alt="Food Image"
                    className="rounded-xl"
                    fill
                    sizes="250px"
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
                        className="rounded-full bg-black p-1 hover:cursor-pointer"
                        onClick={() => {
                          removeFromCart(item.product);
                        }}
                      >
                        <Minus color="white" size={15} />
                      </button>
                      <div>{`${item.quantity}`}</div>
                      <button
                        className="rounded-full bg-black p-1 hover:cursor-pointer"
                        onClick={() => {
                          addToCart(item.product);
                        }}
                      >
                        <Plus color="white" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="bg-[#F0F0F0] p-3 rounded-xl mb-5">
              <div className="flex justify-between">
                <div className="text-gray-600 font-semibold">Total</div>
                <div className="font-bold">{`Rp ${price
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}</div>
              </div>
            </div>
            <div className="rounded-full bg-[#660B05] text-white">
              <button
                onClick={async () => {
                  setDisable(true);
                  const { message } = await createOrder(cart, tableId);
                  if (message === "Invalid URL") {
                    toast.error(message, {
                      icon: "🔴",
                      duration: 1000,
                      style: {
                        border: "2px solid #DC3C22",
                      },
                    });
                    setDisable(false);
                  } else if (message === "Cart's empty") {
                    toast.error(message, {
                      icon: "🟡",
                      duration: 1000,
                      style: {
                        border: "2px solid #FEB21A",
                      },
                    });
                    setDisable(false);
                  } else {
                    sessionStorage.setItem("tableId", tableId);
                    router.push("/dashboard/payment");
                  }
                }}
                className="w-full h-10 hover:cursor-pointer"
                disabled={disable}
              >
                {disable ? "Loading..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
