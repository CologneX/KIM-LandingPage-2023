"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { usePathname, useRouter } from "next/navigation";
export default function NavbarLinks() {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <Tabs
      variant="light"
      color="primary"
      selectedKey={pathName.startsWith("/produk") ? "/produk" : pathName}
      className="hidden lg:flex"
      onSelectionChange={(e) => {
        router.push(e as string);
      }}
    >
      {siteConfig.navItems.map((item) => (
        <Tab key={item.href} title={item.label} />
      ))}
    </Tabs>
  );
}
