"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const Qris = () => {
  const [price, setPrice] = useState("");
  const [tableId, setTableId] = useState("");

  useEffect(() => {
    setTableId(sessionStorage.getItem("tableId") || "");
    setPrice(sessionStorage.getItem("price") || "");
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <div className="flex gap-2 items-center mb-5">
        <Link href={`/dashboard?id=${tableId}`}>
          <ArrowLeft />
        </Link>
        <div className="font-semibold text-xl">Confirm & Pay</div>
      </div>
      <div className="p-5 bg-orange-100 rounded-2xl shadow-md mb-5 border-1 border-orange-300">
        <div className="text-center text-xl font-bold text-orange-900 mb-1">
          QRIS Payment
        </div>
        <div className="text-center text-sm text-gray-600 mb-5">
          Scan the code below with your favorite wallet app.
        </div>
        <div className="flex justify-center items-center mb-5">
          <Image
            src={"/qris.png"}
            alt="Qris image"
            width={200}
            height={200}
            sizes="500px"
            priority
            className=" rounded-xl shadow-md border-1 border-black"
          ></Image>
        </div>
        <div className="text-center text-3xl font-semibold text-orange-800 mb-3">
          {`Rp ${price
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}`}
        </div>
        <div className="text-center text-gray-600">{`Table ${tableId}`}</div>
      </div>
    </>
  );
};

export default Qris;
