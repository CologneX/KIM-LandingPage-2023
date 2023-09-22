import React from "react";
import type { Metadata } from "next";
import ProductCards from "./productCards";

export const metadata: Metadata = {
  title: "Produk",
  description: "Daftar Produk Tangulangin Crafts",
};

async function getProducts() {
  try {
    const res = await fetch("https://dummyjson.com/products", {
      cache: "force-cache",
    });
    const data = await res.json();
    return data.products;
  } catch (error) {
    throw new Error("Gagal dalam mengambil data produk");
  }
}

export default async function ProdukPage() {
  const products = await getProducts();
  return (
    <>
    
      <div className="grid grid-flow-row gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-auto-fit;">
        {products &&
          products.map((product: any) => {
            return <ProductCards {...product} />;
          })}
      </div>
    </>
  );
}
