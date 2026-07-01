"use client";

import { SocialIcon } from "react-social-icons";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/src/app/hooks/useTheme";
import { socialLinks } from "@/src/app/data/social";

export const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  const logoSrc = resolvedTheme === "dark"
    ? "/assets/logo/CDenn_white.png"
    : "/assets/logo/CDenn.png";

  const iconStyle = (network: string) => ({
    height: 36,
    width: 36,
    border: hoveredIcon === network ? "2px solid #253C38" : "1px solid transparent",
    borderRadius: "50%",
    transition: "border 0.2s ease",
  });

  return (
    <footer className="border-t pt-20 pb-10 px-6 transition-colors duration-300 border-zinc-200 bg-[#FCF7F2] dark:border-[#1a1a1a] dark:bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src={logoSrc}
                alt="CDenn Logo"
                width={120}
                height={40}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-zinc-500 dark:text-[#888888]">
              Software Engineer helping businesses build scalable web products.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-slate-900 dark:text-[#FCF7F2]">Navigation</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-[#888888]">
              <li><Link href="/" className="hover:text-primary dark:hover:text-[#FCF7F2]">Home</Link></li>
              <li><Link href="#about" className="hover:text-primary dark:hover:text-[#FCF7F2]">About</Link></li>
              <li><Link href="#solutions" className="hover:text-primary dark:hover:text-[#FCF7F2]">Solutions</Link></li>
              <li><Link href="#contact" className="hover:text-primary dark:hover:text-[#FCF7F2]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-slate-900 dark:text-[#FCF7F2]">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-[#888888]">
              <li><a href="/privacy" className="hover:text-primary dark:hover:text-[#FCF7F2] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm border-zinc-200 text-zinc-400 dark:border-[#1a1a1a] dark:text-[#555555]">
          <p>© {new Date().getFullYear()} CDenn. All rights reserved.</p>
          
          <div className="flex gap-3 items-center pr-20 md:pr-0">
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.network}
                network={link.network}
                url={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...iconStyle(link.network),
                  transition: "transform 0.2s ease, border 0.2s ease",
                  transform: hoveredIcon === link.network ? "scale(1.1)" : "scale(1)",
                }}
                bgColor="#0f172b"
                className="dark:bg-[#f4f4f5]! cursor-pointer rounded-full"
                onMouseEnter={() => setHoveredIcon(link.network)}
                onMouseLeave={() => setHoveredIcon(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};