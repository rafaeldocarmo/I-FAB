import {defineField, defineType} from 'sanity'

/**
 * A single member of the board (name, role, affiliation, links).
 */
export default defineType({
  name: 'committeeMember',
  title: 'Board member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Main role',
      description: 'Primary position or title (e.g. Chair, Secretary)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryRole',
      title: 'Secondary role',
      description: 'Optional second line (e.g. co-chair, sub-board lead)',
      type: 'string',
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional information',
      description: 'Extra context shown on the member card (e.g. expertise, notes)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Describe the image for screen readers and SEO',
        }),
      ],
    }),
    defineField({
      name: 'university',
      title: 'University',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'contactUrl',
      title: 'Contact link',
      description: 'Email (mailto:) or contact page URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'socialUrl',
      title: 'Social link',
      description: 'LinkedIn, X, or other social profile URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      secondaryRole: 'secondaryRole',
      university: 'university',
      country: 'country',
      media: 'image',
    },
    prepare({title, role, secondaryRole, university, country, media}) {
      const parts = [university, country].filter(Boolean)
      const roles = [role, secondaryRole].filter(Boolean).join(' · ')
      return {
        title: title ?? 'Untitled',
        subtitle: [roles, parts.join(' · ')].filter(Boolean).join(' — '),
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})
