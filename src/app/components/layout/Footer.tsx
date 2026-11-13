import Link from "next/link";
import Image from "next/image";
import { socialLinks } from "@/src/app/data/social";
import { GithubIcon } from "@/src/app/components/icons/GithubIcon";
import { LinkedInIcon } from "@/src/app/components/icons/LinkedInIcon";
import { XIcon } from "@/src/app/components/icons/XIcon";
import { BehanceIcon } from "@/src/app/components/icons/BehanceIcon";
import { DribbbleIcon } from "@/src/app/components/icons/DribbbleIcon";
import { MediumIcon } from "@/src/app/components/icons/MediumIcon";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedInIcon size={18} />,
  x: <XIcon size={18} />,
  behance: <BehanceIcon size={18} />,
  dribbble: <DribbbleIcon size={18} />,
  medium: <MediumIcon size={18} />,
};

const navigation = [
  { href: "/", label: "Home" },
  { href: "#about", label: "How I work" },
  { href: "#solutions", label: "Selected work" },
  { href: "/solutions", label: "All case studies" },
  // Footer only, not primary navigation, until the first piece is published.
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About CDenn" },
  { href: "#contact", label: "Contact" },
];

const services = [
  { href: "/services/multi-tenant-saas", label: "Multi-tenant SaaS" },
  { href: "/services/fintech-automation", label: "Fintech and payments" },
  { href: "/services/offline-first-apps", label: "Offline-first apps" },
  { href: "/services", label: "All services" },
];

const legal = [{ href: "/privacy", label: "Privacy policy" }];

const columnLink =
  "inline-flex min-h-11 items-center text-base text-ink-muted transition-colors hover:text-ink";

/**
 * A server component. The logo used to be picked in JavaScript from the
 * resolved theme, which required "use client" and pulled the whole footer into
 * the bundle for one image swap. Two `<Image>`s toggled by the `dark` class do
 * the same job with no client code.
 */
export const Footer = () => {
  return (
    <footer className="bg-canvas px-4 pt-16 pb-10 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
              Let&apos;s build something that pays for itself.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink-muted">
              From bank-grade platforms to a church&apos;s live stream, the problem changes; the
              discipline doesn&apos;t.
            </p>
          </div>
          <div className="md:pb-2">
            {/* Secondary, not primary: the one primary action on this page is
                the contact form's own submit button. */}
            <Link
              href="#contact"
              className="press inline-flex min-h-12 items-center border border-line-strong px-6 text-base font-bold text-ink transition-colors hover:bg-surface-alt"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="mb-14 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="mb-5 inline-flex min-h-11 items-center" aria-label="CDenn home">
              <Image
                src="/assets/logo/CDenn.png"
                alt="CDenn"
                width={120}
                height={40}
                className="h-9 w-auto object-contain dark:hidden"
              />
              <Image
                src="/assets/logo/CDenn_white.png"
                alt="CDenn"
                width={120}
                height={40}
                className="hidden h-9 w-auto object-contain dark:block"
              />
            </Link>
            <p className="text-base leading-7 text-ink-muted">
              CDenn - Engineering from Nairobi, Kenya. Multi-tenant platforms, payments and
              reconciliation, offline-first products and AI-assisted operations. Open to remote
              engineering roles and selected client work.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-2 text-base font-bold text-ink">Navigation</h2>
            <ul>
              {navigation.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link href={item.href} className={columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="mb-2 text-base font-bold text-ink">Services</h2>
            <ul>
              {services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="mb-2 text-base font-bold text-ink">Legal</h2>
            <ul>
              {legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-base text-ink-muted md:flex-row md:items-center">
          <p className="tabular-nums">© {new Date().getFullYear()} CDenn. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.network}
                href={link.url}
                target="_blank"
                rel="me noopener noreferrer"
                aria-label={link.label}
                className="flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
              >
                {iconMap[link.network]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
