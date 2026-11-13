import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center bg-canvas px-6 text-ink">
      <div className="mx-auto w-full max-w-3xl border-t-2 border-primary pt-6">
        <h1 className="text-5xl font-bold tracking-[-0.04em] md:text-7xl">404</h1>
        <p className="mt-4 text-3xl font-bold tracking-[-0.03em] text-ink-muted md:text-4xl">This page is not here.</p>
        <p className="mt-6 max-w-xl text-lg leading-8 text-ink-muted">The link may be old, or the page may have moved. The portfolio home and selected work are still available.</p>
        <nav className="mt-10 flex flex-wrap gap-3" aria-label="Recovery navigation">
          <Link href="/" className="inline-flex min-h-12 items-center border border-primary bg-primary px-5 text-sm font-bold text-on-primary transition-colors hover:bg-transparent hover:text-primary">Go home</Link>
          <Link href="/#solutions" className="inline-flex min-h-12 items-center border border-line-strong px-5 text-sm font-bold transition-colors hover:border-foreground">View selected work</Link>
          <Link href="/#contact" className="inline-flex min-h-12 items-center border border-line-strong px-5 text-sm font-bold transition-colors hover:border-foreground">Contact</Link>
        </nav>
      </div>
    </main>
  );
}
