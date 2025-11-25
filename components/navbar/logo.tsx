"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Logo = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const logoSrc = "/logo_miagrimensor.svg";

  if (isHome) {
    return (
      <Image
        src={logoSrc}
        alt="Logo Mi Agrimensor"
        width={285}
        height={66}
        priority
        className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto min-w-0 max-w-full"
        style={{ height: 'auto' }}
      />
    );
  }

  return (
    <Link href="/" className="hover:opacity-80 transition-opacity">
      <Image
        src={logoSrc}
        alt="Logo Mi Agrimensor"
        width={285}
        height={66}
        priority
        className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto min-w-0 max-w-full"
        style={{ height: 'auto' }}
      />
    </Link>
  );
};