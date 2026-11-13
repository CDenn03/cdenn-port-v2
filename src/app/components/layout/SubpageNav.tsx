import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/src/app/components/ui/ThemeToggle";

interface SubpageNavProps {
  /** Where the back button navigates. Defaults to "/". */
  backHref?: string;
  /** Label shown next to the arrow. Defaults to "Back". */
  backLabel?: string;
}

/**
 * Forward navigation for subpages. The site footer only renders on the
 * homepage, so without these links a case study or service page can only be
 * left via the Back control.
 */
const forwardLinks = [
  { href: "/solutions", label: "Work", alwaysVisible: true },
  { href: "/services", label: "Services", alwaysVisible: true },
  { href: "/writing", label: "Writing", alwaysVisible: false },
  { href: "/#contact", label: "Contact", alwaysVisible: false },
];

/**
 * A server component. The logo was previously chosen from the resolved theme
 * in JavaScript, which made this bar - and so every subpage's header - client
 * code for one image swap. Two `<Image>`s toggled by the `dark` class do it
 * with none.
 */
export function SubpageNav({ backHref = "/", backLabel = "Back" }: SubpageNavProps) {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-canvas">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        {/* left: back button */}
        <Link
          href={backHref}
          className="group/cta inline-flex min-h-11 shrink-0 items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)] motion-safe:group-hover/cta:-translate-x-0.5"
          />
          {backLabel}
        </Link>

        {/* center: logo. Hidden below md so it cannot overlap the links. */}
        <Link
          href="/"
          className="absolute left-1/2 hidden min-h-11 -translate-x-1/2 items-center md:flex"
          aria-label="CDenn home"
        >
          <Image
            src="/assets/logo/CDenn.png"
            alt="CDenn"
            width={100}
            height={36}
            className="h-8 w-auto object-contain dark:hidden"
          />
          <Image
            src="/assets/logo/CDenn_white.png"
            alt="CDenn"
            width={100}
            height={36}
            className="hidden h-8 w-auto object-contain dark:block"
          />
        </Link>

        {/* right: forward navigation + theme toggle */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          {forwardLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                link.alwaysVisible ? "inline-flex" : "hidden sm:inline-flex"
              } link-underline min-h-11 min-w-11 items-center justify-center text-sm text-ink-muted transition-colors hover:text-ink`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
