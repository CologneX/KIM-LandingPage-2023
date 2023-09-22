"use client";

import { usePathname } from "next/navigation";
export default function Title() {
  const pathname = usePathname();
  return (
    pathname === "/produk" && (
      <h1 className="text-4xl font-bold">Produk Kami</h1>
    )
  );
}
