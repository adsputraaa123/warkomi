import Cart from "@/components/cart";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Filter from "@/components/filter";
import { DashboardProvider } from "@/context/DashboardContext";
import ProductCard from "@/components/products-card";

export default async function dashboard() {
  const products = await prisma.product.findMany();

  return (
    <>
      <DashboardProvider>
        <div>
          <nav className="fixed z-1 w-full bg-white shadow-md flex justify-between items-center p-5">
            <Filter />
            <Image
              src="/logo.png"
              alt="Food Image"
              width={100}
              height={100}
              priority={true}
              style={{ width: "auto", height: "30px" }}
            ></Image>
            <Cart />
          </nav>
          <div
            id="product"
            className="transition-all duration-250 grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-5 pt-21"
          >
            <ProductCard products={products} />
          </div>
        </div>
      </DashboardProvider>
    </>
  );
}
