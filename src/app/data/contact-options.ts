/**
 * The single source of truth for the contact form's choice fields.
 *
 * The client renders `label`, and both the client and the route validate
 * `value`. Sending a stable key rather than the display string is what lets the
 * server reject anything outside the list: it previously accepted arbitrary
 * free text in these fields.
 */

export type ChoiceOption = { value: string; label: string };

export const ENGAGEMENT_OPTIONS: readonly ChoiceOption[] = [
  { value: "contract", label: "Freelance or contract" },
  { value: "full-time", label: "Full-time role" },
  { value: "advisory", label: "Technical advisory" },
  { value: "audit", label: "Code review or audit" },
  { value: "partnership", label: "Partnership or collaboration" },
  { value: "other", label: "Something else" },
];

/**
 * Budget bands are quoted in USD only.
 *
 * They were previously relabelled into the visitor's local currency from their
 * time zone without converting the amount, so the same band read as USD 5,000
 * in New York and KES 5,000 in Nairobi. One declared currency keeps the answer
 * meaningful.
 */
export const BUDGET_OPTIONS: readonly ChoiceOption[] = [
  { value: "unstated", label: "Prefer not to say" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 to $10,000" },
  { value: "10k-25k", label: "$10,000 to $25,000" },
  { value: "25k-plus", label: "$25,000 or more" },
];

export const PRIVACY_REQUEST_OPTIONS: readonly ChoiceOption[] = [
  { value: "access", label: "Access my data" },
  { value: "correct", label: "Correct my data" },
  { value: "delete", label: "Delete my data" },
  { value: "withdraw", label: "Withdraw consent" },
  { value: "other", label: "General privacy question" },
];

/** The name of the hidden field a bot is likely to fill and a person never sees. */
export const HONEYPOT_FIELD = "botField";

function labelLookup(options: readonly ChoiceOption[]) {
  return (value: string): string | null =>
    options.find((option) => option.value === value)?.label ?? null;
}

/** Returns the display label for a submitted value, or null when it is not in the list. */
export const engagementLabel = labelLookup(ENGAGEMENT_OPTIONS);
export const budgetLabel = labelLookup(BUDGET_OPTIONS);
export const privacyRequestLabel = labelLookup(PRIVACY_REQUEST_OPTIONS);
