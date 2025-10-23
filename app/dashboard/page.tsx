import Cart from "@/components/cart";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Filter from "@/components/filter";
import Cardbutton from "@/components/card-button";
import { DashboardProvider } from "@/context/DashboardContext";

export default async function dashboard({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) {
  const param = await searchParams;
  const categories = param.categories
    ? param.categories.split(",")
    : ["coffee", "dessert", "food", "drink"];

  const item = await prisma.product.findMany({
    where: {
      category: {
        in: categories,
      },
    },
  });

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
            {item.map((product) => (
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
          </div>
        </div>
      </DashboardProvider>
    </>
  );
}
