import { defineCollection, reference } from 'astro:content'
import { z } from 'astro/zod'

/**
 * This collection will strictly be about our client data. We'll create another
 * collection to manage testimonials and case studies.
 */
const clientsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    logoUrl: z.string(),
    name: z.string(),
    partnershipDate: z.string().datetime(),
    published: z.boolean().default(false),
    website: z.string(),
  }),
})

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.string().datetime(),
    description: z.string().optional(),
    title: z.string(),
    author: reference('team'),
  }),
})

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    client: reference('clients').optional(),
    date: z.string().datetime(),
    description: z.string(),
    published: z.boolean().default(false),
    title: z.string(),
    type: z.enum(['OPEN_SOURCE', 'CLIENT']),
  }),
})

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().default(Infinity),
    published: z.boolean().default(false),
  }),
})

const teamCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string().optional(),
    imgUrl: z.string().optional(),
    order: z.number().default(Infinity),
    published: z.boolean().default(false),
    /**
     * Social media links. My thought is a person might use them to vette us.
     * They are optional, so you can choose to share what you want
     */
    github: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
  }),
})

const technologiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    /**
     * Should match a filename in ./src/icons without the extension
     */
    iconName: z.string(),
    order: z.number().default(Infinity),
    published: z.boolean().default(false),
  }),
})

export const collections = {
  clients: clientsCollection,
  projects: projectsCollection,
  posts: postsCollection,
  services: servicesCollection,
  team: teamCollection,
  technologies: technologiesCollection,
}
