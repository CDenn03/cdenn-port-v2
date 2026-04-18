export function detectCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzCurrencyMap: Record<string, string> = {
      "Africa/Nairobi": "KES",
      "Africa/Lagos": "NGN",
      "Africa/Accra": "GHS",
      "Africa/Johannesburg": "ZAR",
      "Africa/Cairo": "EGP",
      "Europe/London": "GBP",
      "Europe/Berlin": "EUR",
      "Europe/Paris": "EUR",
      "America/New_York": "USD",
      "America/Los_Angeles": "USD",
      "Asia/Dubai": "AED",
      "Asia/Kolkata": "INR",
    };
    return tzCurrencyMap[tz] ?? "USD";
  } catch {
    return "USD";
  }
}

export function formatBudget(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()}`;
  }
}

export const engagementTypes = [
  "Freelance / Contract",
  "Full-time Opportunity",
  "Technical Advisory",
  "Code Review / Audit",
  "Mentorship",
  "Partnership / Collaboration",
  "Other (I'll specify)",
];

export function buildBudgetOptions(currency: string) {
  return [
    { value: "prefer-not", label: "Prefer not to say" },
    { value: `< ${formatBudget(5000, currency)}`, label: `< ${formatBudget(5000, currency)}` },
    { value: `${formatBudget(5000, currency)} – ${formatBudget(10000, currency)}`, label: `${formatBudget(5000, currency)} – ${formatBudget(10000, currency)}` },
    { value: `${formatBudget(10000, currency)} – ${formatBudget(25000, currency)}`, label: `${formatBudget(10000, currency)} – ${formatBudget(25000, currency)}` },
    { value: `${formatBudget(25000, currency)}+`, label: `${formatBudget(25000, currency)}+` },
  ];
}

export const fallbackBudgetOptions = [
  { value: "prefer-not", label: "Prefer not to say" },
  { value: "< $5,000", label: "< $5,000" },
  { value: "$5,000 – $10,000", label: "$5,000 – $10,000" },
  { value: "$10,000 – $25,000", label: "$10,000 – $25,000" },
  { value: "$25,000+", label: "$25,000+" },
];
