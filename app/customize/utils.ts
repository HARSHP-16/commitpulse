import type { ExportFormat } from './types';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://commitpulse.vercel.app';
const BADGE_BASE_URL = `${siteUrl}/api/streak`;

export function stripHash(val: string): string {
  return val.replace(/^#/, '');
}

export function isValidHex(value: string): boolean {
  return /^[0-9a-fA-F]{6}$/.test(stripHash(value));
}

export function getBadgeUrl(queryString: string): string {
  return `${BADGE_BASE_URL}?${queryString}`;
}

export function getExportSnippet(format: ExportFormat, queryString: string): string {
  const badgeUrl = getBadgeUrl(queryString);

  if (format === 'html') {
    return `<img src="${badgeUrl}" alt="CommitPulse" />`;
  }

  return `![CommitPulse](${badgeUrl})`;
}

export function getPlaceholderSnippet(format: ExportFormat): string {
  return getExportSnippet(format, 'user=your-github-username');
}
