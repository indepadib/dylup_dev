"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  className?: string;
  variant?: "full" | "mark";
  priority?: boolean;
  width?: number;
  height?: number;
};

export function Logo({
  href = "/",
  className,
  variant = "full",
  priority = false,
  width,
  height,
}: Props) {
  // defaults: full lockup around 120×28, mark around 28×28
  const dims =
    variant === "full"
      ? { w: width ?? 120, h: height ?? 28 }
      : { w: width ?? 28, h: height ?? 28 };

  const lightSrc =
    variant === "full" ? "/brand/logo-light.svg" : "/brand/mark-light.svg";
  const darkSrc =
    variant === "full" ? "/brand/logo-dark.svg" : "/brand/mark-dark.svg";

  return (
    <Link href={href} className={cn("flex items-center", className)} aria-label="Dylup — Accueil">
      {/* Light theme logo */}
      <Image
        src={lightSrc}
        alt="Dylup"
        width={dims.w}
        height={dims.h}
        priority={priority}
        className="block dark:hidden"
      />
      {/* Dark theme logo */}
      <Image
        src={darkSrc}
        alt="Dylup"
        width={dims.w}
        height={dims.h}
        priority={priority}
        className="hidden dark:block"
      />
    </Link>
  );
}
