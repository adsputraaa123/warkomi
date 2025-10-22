"use server";

// import { prisma } from "@/lib/prisma";
import { cart } from "../context/DashboardContext";
import { redirect } from "next/navigation";

export async function createOrder(cart: cart[], tableId: string) {
  const table: string[] = ["1", "2", "3", "4", "5", "6"];

  if (table.includes(tableId)) {
    if (cart.length === 0) {
      return {
        message: "Cart's empty",
      };
    } else {
      return {
        message: "Success",
      };
    }
  } else {
    return {
      message: "Invalid URL",
    };
  }

  // if (table.includes(tableId)) {
  //   if (cart.length === 0) {
  //     return {
  //       message: "Cart's empty",
  //     };
  //   } else {
  //     cart.map(
  //       async (item) =>
  //         await prisma.order.create({
  //           data: {
  //             product: {
  //               connect: {
  //                 id: item.product.id,
  //               },
  //             },
  //             table: {
  //               connect: {
  //                 id: parseInt(tableId),
  //               },
  //             },
  //             quantity: item.quantity,
  //           },
  //         })
  //     );

  //     return {
  //       message: "Success",
  //     };
  //   }
  // } else {
  //   return {
  //     message: "Invalid URL",
  //   };
  // }
}

export async function tempOrder() {
  console.log("temporder");
  redirect("/dashboard/payment");
}
