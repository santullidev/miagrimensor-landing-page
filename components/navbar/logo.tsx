"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Logo = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <Image
        src="/logo_miagrimensor.svg"
        alt="Logo Mi Agrimensor"
        width={124}
        height={32}
        priority
      />
    );
  }

  return (
    <Link href="/" className="hover:opacity-80 transition-opacity">
      <Image
        src="/logo_miagrimensor.svg"
        alt="Logo Mi Agrimensor"
        width={124}
        height={32}
        priority
      />
    </Link>
  );
};