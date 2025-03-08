"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLink = ({ href, title }: { href: string; title: string }) => {
  const pathName = usePathname();
  return (
    <Link href={href} className={pathName === href ? "menu-active" : ""}>
      {title}
    </Link>
  );
};

export default SidebarLink;
