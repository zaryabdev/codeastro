import type { CollectionEntry } from 'astro:content'

export const TOP_LEVEL_NAV_ITEMS = [
  { href: '/services', text: 'Services' },
  { href: '/about', text: 'About' },
  { href: '/blog', text: 'Blog' },
  { href: '/projects', text: 'Projects' },
  { href: '/contact', text: 'Contact Us' },
] as const

export const PROJECT_TYPE_TO_LABEL: Record<
  CollectionEntry<'projects'>['data']['type'],
  string
> = {
  CLIENT: 'Client',
  OPEN_SOURCE: 'Open Source',
}
