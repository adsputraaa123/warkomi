"use client";

import { ListFilter } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GlassWater, Dessert, Bean, Ham } from "lucide-react";
import { UseDashboardContext } from "@/context/DashboardContext";

const Filter = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const { pressFilter, pressCart, setPressFilter, setPressCart } =
    UseDashboardContext();
  const [category, setCategory] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((c) => {
      const newCategory = e.target.checked
        ? [...c, e.target.value]
        : c.filter((c) => c !== e.target.value);
      return newCategory;
    });
  };

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
  }, [pressFilter, pressCart]);

  useEffect(() => {
    const param = new URLSearchParams(searchParams);
    if (category.length === 0) {
      param.delete("categories");
    } else {
      param.set("categories", category.join(","));
    }
    replace(`${pathName}?${param.toString()}`);
  }, [category, pathName, searchParams, replace]);

  return (
    <>
      <button
        type="button"
        className="z-1 hover:cursor-pointer"
        onClick={() => {
          setPressFilter(!pressFilter);
          setPressCart(false);
        }}
      >
        <ListFilter />
      </button>
      <div
        id="filter"
        className={`${
          pressFilter ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all duration-250 fixed top-0 left-0 p-5 pt-21 w-full sm:w-75`}
      >
        <div className="bg-white rounded-xl shadow-md text-lg ">
          <div>
            <input
              className="hidden peer"
              type="checkbox"
              name="categories"
              id="food"
              value="food"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="food"
              className="flex items-center justify-between border-b-1 py-2 px-5 rounded-t-xl peer-checked:bg-[#660B05] peer-checked:text-white cursor-pointer tracking-wide"
            >
              Foods <Ham />
            </label>
          </div>
          <div>
            <input
              className="hidden peer"
              type="checkbox"
              name="categories"
              id="drink"
              value="drink"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="drink"
              className="flex items-center justify-between border-b-1 py-2 px-5 peer-checked:bg-[#660B05] peer-checked:text-white cursor-pointer tracking-wide"
            >
              Drinks <GlassWater />
            </label>
          </div>
          <div>
            <input
              className="hidden peer"
              type="checkbox"
              name="categories"
              id="coffee"
              value="coffee"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="coffee"
              className="flex items-center justify-between border-b-1 py-2 px-5 peer-checked:bg-[#660B05] peer-checked:text-white cursor-pointer tracking-wide"
            >
              Coffee <Bean />
            </label>
          </div>
          <div>
            <input
              className="hidden peer"
              type="checkbox"
              name="categories"
              id="dessert"
              value="dessert"
              onChange={(e) => handleChange(e)}
            />
            <label
              htmlFor="dessert"
              className="flex items-center justify-between py-2 px-5 rounded-b-xl peer-checked:bg-[#660B05] peer-checked:text-white cursor-pointer tracking-wide"
            >
              Dessert <Dessert />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
