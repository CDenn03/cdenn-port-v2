/**
 * The first focusable element on every page, so a keyboard visitor can reach
 * the content without tabbing through the whole header. Every page's <main>
 * carries id="main".
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:min-h-12 focus:items-center focus:bg-primary focus:px-4 focus:text-base focus:font-bold focus:text-on-primary focus:no-underline"
    >
      Skip to content
    </a>
  );
}
