"use client";

import { SocialIcon } from "react-social-icons";
import { useState } from "react";
import Link from "next/link";

export const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const iconStyle = (network: string) => ({
    height: 36,
    width: 36,
    border: hoveredIcon === network ? "2px solid #10b981" : "1px solid transparent",
    borderRadius: "50%",
    transition: "border 0.2s ease",
  });

  return (
    <footer className="border-t pt-20 pb-10 px-6 transition-colors duration-300 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            <div className="text-2xl font-bold tracking-tighter mb-6 text-slate-900 dark:text-zinc-100">
              CDENN<span className="text-emerald-500">.</span>
            </div>
            <p className="text-sm text-zinc-500">
              Software Engineer helping businesses build scalable web products.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-slate-900 dark:text-zinc-100">Navigation</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link href="/" className="hover:text-emerald-500">Home</Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-emerald-500">About</Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:text-emerald-500">Solutions</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-emerald-500">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-slate-900 dark:text-zinc-100">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="/privacy" className="hover:text-emerald-500">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-emerald-500">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm border-zinc-100 text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
          <p>© 2025 CDenn. All rights reserved.</p>
          <div className="flex gap-3 items-center pr-20 md:pr-0">
            <SocialIcon
              network="github"
              url="https://github.com/CDenn03"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...iconStyle("github"),
                transition: "transform 0.2s ease, border 0.2s ease",
                transform: hoveredIcon === "github" ? "scale(1.1)" : "scale(1)",
              }}
              bgColor="#0f172b"
              className="dark:bg-[#f4f4f5]! cursor-pointer rounded-full"
              onMouseEnter={() => setHoveredIcon("github")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              network="linkedin"
              url="https://www.linkedin.com/in/cdenn03"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...iconStyle("linkedin"),
                transition: "transform 0.2s ease, border 0.2s ease",
                transform: hoveredIcon === "linkedin" ? "scale(1.1)" : "scale(1)",
              }}
              bgColor="#0f172b"
              className="dark:bg-[#f4f4f5]! cursor-pointer rounded-full"
              onMouseEnter={() => setHoveredIcon("linkedin")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              network="x"
              url="https://x.com/C_MDennis"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...iconStyle("x"),
                transition: "transform 0.2s ease, border 0.2s ease",
                transform: hoveredIcon === "x" ? "scale(1.1)" : "scale(1)",
              }}
              bgColor="#0f172b"
              className="dark:bg-[#f4f4f5]! cursor-pointer rounded-full"
              onMouseEnter={() => setHoveredIcon("x")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              network="behance"
              url="https://www.behance.net/dennisndungu8"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...iconStyle("behance"),
                transition: "transform 0.2s ease, border 0.2s ease",
                transform: hoveredIcon === "behance" ? "scale(1.1)" : "scale(1)",
              }}
              bgColor="#0f172b"
              className="dark:bg-[#f4f4f5]! cursor-pointer rounded-full"
              onMouseEnter={() => setHoveredIcon("behance")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              network="dribbble"
              url="https://dribbble.com/CDenn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...iconStyle("dribbble"),
                transition: "transform 0.2s ease, border 0.2s ease",
                transform: hoveredIcon === "dribbble" ? "scale(1.1)" : "scale(1)",
              }}
              bgColor="#0f172b"
              className="dark:bg-[#f4f4f5]! cursor-pointer rounded-full"
              onMouseEnter={() => setHoveredIcon("dribbble")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
            <SocialIcon
              network="medium"
              url="https://medium.com/@cdenn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                ...iconStyle("medium"),
                transition: "transform 0.2s ease, border 0.2s ease",
                transform: hoveredIcon === "medium" ? "scale(1.1)" : "scale(1)",
              }}
              bgColor="#0f172b"
              className="dark:bg-[#f4f4f5]! cursor-pointer rounded-full"
              onMouseEnter={() => setHoveredIcon("medium")}
              onMouseLeave={() => setHoveredIcon(null)}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};