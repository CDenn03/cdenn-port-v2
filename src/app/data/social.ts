export interface SocialLink {
  network: string;
  url: string;
  label: string;
}

export const socialLinks: SocialLink[] = [
  { network: "github", url: "https://github.com/CDenn03", label: "GitHub" },
  { network: "linkedin", url: "https://www.linkedin.com/in/cdenn03", label: "LinkedIn" },
  { network: "x", url: "https://x.com/C_MDennis", label: "X" },
  { network: "behance", url: "https://www.behance.net/dennisndungu8", label: "Behance" },
  { network: "dribbble", url: "https://dribbble.com/CDenn", label: "Dribbble" },
  { network: "medium", url: "https://medium.com/@cdenn", label: "Medium" },
];

export const sameAsUrls: string[] = [
  "https://github.com/CDenn03",
  "https://www.linkedin.com/in/cdenn03",
  "https://x.com/C_MDennis",
  "https://medium.com/@cdenn",
];
