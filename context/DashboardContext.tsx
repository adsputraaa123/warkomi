"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

export type cart = {
  product: product;
  quantity: number;
};

interface contextType {
  cart: cart[];
  price: number;
  pressCart: boolean;
  pressFilter: boolean;
  category: string[];
  addToCart: (product: product) => void;
  removeFromCart: (product: product) => void;
  setPressCart: React.Dispatch<React.SetStateAction<boolean>>;
  setPressFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
}

const contextDefaultValue = {
  cart: [],
  price: 0,
  pressCart: false,
  pressFilter: false,
  category: [],
  addToCart: () => {},
  removeFromCart: () => {},
  setPressCart: () => {},
  setPressFilter: () => {},
  setCategory: () => {},
};

const dashboardContext = createContext<contextType>(contextDefaultValue);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<cart[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [pressCart, setPressCart] = useState<boolean>(false);
  const [pressFilter, setPressFilter] = useState<boolean>(false);
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    if (!sessionStorage.getItem("cart") || !sessionStorage.getItem("price")) {
      sessionStorage.setItem("cart", "[]");
      sessionStorage.setItem("price", "0");
    } else {
      const sessionCart = JSON.parse(sessionStorage.getItem("cart")!);
      const sessionPrice = parseInt(sessionStorage.getItem("price")!);
      setCart(sessionCart);
      setPrice(sessionPrice);
    }
  }, []);

  const addToCart = (product: product) => {
    const exist = cart.find((c) => c.product.id === product.id);
    if (exist) {
      const newCart = cart.map((c) => {
        if (c.product.id === exist.product.id) {
          return { ...c, quantity: c.quantity + 1 };
        } else {
          return c;
        }
      });
      setCart(() => {
        sessionStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
      setPrice(() => {
        sessionStorage.setItem("price", `${price + exist.product.price}`);
        return price + exist.product.price;
      });
    } else {
      setCart((c) => {
        sessionStorage.setItem(
          "cart",
          JSON.stringify([...c, { product, quantity: 1 }])
        );
        return [...c, { product, quantity: 1 }];
      });
      setPrice(() => {
        sessionStorage.setItem("price", `${price + product.price}`);
        return price + product.price;
      });
    }
  };

  const removeFromCart = (product: product) => {
    const newCart = cart.map((c) => {
      if (c.product.id === product.id) {
        return { ...c, quantity: c.quantity - 1 };
      } else {
        return c;
      }
    });

    setCart(() => {
      sessionStorage.setItem(
        "cart",
        JSON.stringify(newCart.filter((item) => item.quantity > 0))
      );
      return newCart.filter((item) => item.quantity > 0);
    });
    setPrice(() => {
      sessionStorage.setItem("price", `${price - product.price}`);
      return price - product.price;
    });
  };

  return (
    <dashboardContext.Provider
      value={{
        cart,
        price,
        pressCart,
        pressFilter,
        category,
        addToCart,
        removeFromCart,
        setPressCart,
        setPressFilter,
        setCategory,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
}

export function UseDashboardContext() {
  return useContext(dashboardContext);
}
