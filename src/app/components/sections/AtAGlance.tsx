import { Reveal } from "../ui/Reveal";

/**
 * A short orientation for a reader who will not scroll further.
 *
 * Every line is a statement of fact that the rest of the page backs up, and
 * the scope sentence at the end exists so the three attributions (employer,
 * independent practice, personal) are never blurred together.
 */
const items: Array<{ lead: string; rest: string; href?: string }> = [
  {
    lead: "Frontend Engineer at E&M Technologies",
    rest: "since January 2025, leading frontend architecture and contributing to enterprise product development.",
  },
  {
    lead: "Three systems described in depth:",
    rest: "Bancassurance (E&M Technologies client work), Opsis (independent CDenn work commissioned by two clients), and WarehouseLens (self-initiated personal project).",
  },
  {
    lead: "A broad engineering combination:",
    rest: "TypeScript and Next.js across the frontend, Rust for an always-on control core, Flutter for field applications, and FastAPI and Python for data and model services.",
  },
  {
    lead: "Design system adopted across five teams:",
    rest: "designed and built a shared component foundation approximately one year ago.",
  },
  {
    lead: "Two deployed systems you can explore:",
    rest: "Opsis and WarehouseLens. WarehouseLens runs illustrative data, not customer operations.",
  },
  {
    lead: "Code:",
    rest: "",
    href: "https://github.com/CDenn03",
  },
];

export const AtAGlance = () => {
  return (
    <section
      id="glance"
      aria-labelledby="glance-heading"
      className="border-b border-line bg-surface-alt px-4 py-12 md:px-6 md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 id="glance-heading" className="text-3xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
            At a glance
          </h2>
        </Reveal>
        <Reveal>
          <ul className="mt-8 grid gap-x-12 border-t border-line md:grid-cols-2">
            {items.map((item) => (
              <li key={item.lead} className="border-b border-line py-4 text-base leading-7 text-ink-muted">
                <span className="font-bold text-ink">{item.lead}</span> {item.rest}
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-primary"
                  >
                    github.com/CDenn03
                  </a>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <p className="mt-6 max-w-3xl text-base leading-7 text-ink">
            My work spans enterprise client delivery through E&amp;M Technologies, independently
            commissioned projects through CDenn, and products I initiate and build myself.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
