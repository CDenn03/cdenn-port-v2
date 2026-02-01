"use client";

import { SocialIcon } from "react-social-icons";

export const Footer = () => {
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
              <li><a href="#" className="hover:text-emerald-500">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-500">About</a></li>
              <li><a href="#solutions" className="hover:text-emerald-500">Solutions</a></li>
              <li><a href="#contact" className="hover:text-emerald-500">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-slate-900 dark:text-zinc-100">Connect</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:text-emerald-500">GitHub</a></li>
              <li><a href="#" className="hover:text-emerald-500">LinkedIn</a></li>
              <li><a href="#" className="hover:text-emerald-500">Twitter/X</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-4 text-slate-900 dark:text-zinc-100">Legal</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:text-emerald-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-500">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm border-zinc-100 text-zinc-400 dark:border-zinc-800 dark:text-zinc-500">
          <p>© 2025 CDenn. All rights reserved.</p>
          <div className="flex gap-4">
            {/* <a href="#" className="hover:text-emerald-500 transition-colors"><Github size={20} /></a> */}
            <SocialIcon network="github" />
            <SocialIcon url="https://linkedin.com/in/couetilc" />
            <SocialIcon network="X" />
            {/* <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter size={20} /></a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};