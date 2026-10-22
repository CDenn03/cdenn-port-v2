import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[#FCF7F2] px-6 text-slate-900 dark:bg-[#0a0a0a] dark:text-[#FCF7F2]">
      <div className="mx-auto w-full max-w-3xl border-t-2 border-primary pt-6">
        <h1 className="text-5xl font-bold tracking-[-0.04em] md:text-7xl">404</h1>
        <p className="mt-4 text-3xl font-bold tracking-[-0.03em] text-zinc-700 md:text-4xl dark:text-zinc-300">This page is not here.</p>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">The link may be old, or the page may have moved. The portfolio home and selected work are still available.</p>
        <nav className="mt-10 flex flex-wrap gap-3" aria-label="Recovery navigation">
          <Link href="/" className="inline-flex min-h-12 items-center border border-primary bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-transparent hover:text-primary dark:hover:text-[#FCF7F2]">Go home</Link>
          <Link href="/#solutions" className="inline-flex min-h-12 items-center border border-zinc-300 px-5 text-sm font-bold transition-colors hover:border-slate-900 dark:border-zinc-700 dark:hover:border-white">View selected work</Link>
          <Link href="/#contact" className="inline-flex min-h-12 items-center border border-zinc-300 px-5 text-sm font-bold transition-colors hover:border-slate-900 dark:border-zinc-700 dark:hover:border-white">Contact</Link>
        </nav>
      </div>
    </main>
  );
}
