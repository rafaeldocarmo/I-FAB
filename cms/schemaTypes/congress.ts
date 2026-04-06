import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * A congress / conference event with location, dates, media, and journal link.
 */
export default defineType({
  name: 'congress',
  title: 'Congress',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Display name (e.g. "Annual Meeting 2026")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      description: 'Venue or location name (e.g. convention center)',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      description: 'Optional — for multi-day events',
      type: 'datetime',
    }),
    defineField({
      name: 'editionNumber',
      title: 'Congress edition number',
      description: 'Ordinal edition (e.g. 12 for the 12th congress)',
      type: 'number',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Image',
      description: 'A single congress image (hero / card).',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for accessibility and SEO',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.max(1),
    }),
    defineField({
      name: 'upcomingCardImageBackdrop',
      title: 'Conferences — upcoming card: image column background',
      description:
        'Controls the area behind the photo on the Conferences page. Light = pale background (edition text in dark blue). Dark = brand blue gradient (edition text in white).',
      type: 'string',
      options: {
        list: [
          {title: 'Light (no blue)', value: 'light'},
          {title: 'Dark / brand (no white)', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'journalItems',
      title: 'Journal / proceedings',
      description:
        'Add one or more external links, PDFs, or images (e.g. proceedings, programme). Shown on the site as separate actions.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'congressJournalItem',
          title: 'Journal item',
          fields: [
            defineField({
              name: 'kind',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'External link', value: 'link'},
                  {title: 'PDF file', value: 'pdf'},
                  {title: 'Image (full size)', value: 'image'},
                ],
                layout: 'radio',
              },
              initialValue: 'link',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label (optional)',
              description: 'Short text on the button or next to the icon, e.g. “Programme PDF”.',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              hidden: ({parent}) => parent?.kind !== 'link',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const p = context.parent as {kind?: string}
                  if (p?.kind === 'link' && !(typeof value === 'string' && value.trim()))
                    return 'URL is required for an external link'
                  return true
                }).uri({
                  allowRelative: false,
                  scheme: ['http', 'https'],
                }),
            }),
            defineField({
              name: 'file',
              title: 'PDF file',
              type: 'file',
              hidden: ({parent}) => parent?.kind !== 'pdf',
              options: {accept: 'application/pdf'},
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const p = context.parent as {kind?: string}
                  if (p?.kind === 'pdf' && !value) return 'Upload a PDF file'
                  return true
                }),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              hidden: ({parent}) => parent?.kind !== 'image',
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                }),
              ],
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const p = context.parent as {kind?: string}
                  if (p?.kind === 'image' && !value) return 'Select an image'
                  return true
                }),
            }),
          ],
          preview: {
            select: {kind: 'kind', label: 'label', url: 'url', media: 'image'},
            prepare({kind, label, url, media}) {
              const fallback =
                kind === 'link' ? (url as string) || 'Link' : kind === 'pdf' ? 'PDF' : 'Image'
              return {
                title: (label as string) || fallback,
                subtitle:
                  kind === 'link'
                    ? 'External link'
                    : kind === 'pdf'
                      ? 'PDF file'
                      : 'Image',
                media,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'journalLinkType',
      title: 'Journal / proceedings (legacy — single)',
      description:
        'Used only if “Journal / proceedings” above is empty. Prefer adding items in the list above.',
      type: 'string',
      hidden: ({document}) =>
        Array.isArray(document?.journalItems) && document!.journalItems!.length > 0,
      options: {
        list: [
          {title: 'External link', value: 'link'},
          {title: 'PDF file (download)', value: 'pdf'},
        ],
        layout: 'radio',
      },
      initialValue: 'link',
    }),
    defineField({
      name: 'journalUrl',
      title: 'Journal URL (legacy)',
      type: 'url',
      hidden: ({document}) =>
        (Array.isArray(document?.journalItems) && document!.journalItems!.length > 0) ||
        document?.journalLinkType === 'pdf',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'journalPdf',
      title: 'Journal PDF (legacy)',
      type: 'file',
      hidden: ({document}) =>
        (Array.isArray(document?.journalItems) && document!.journalItems!.length > 0) ||
        document?.journalLinkType !== 'pdf',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'homeEyebrow',
      title: 'Homepage countdown label',
      description:
        'Short line above the countdown on the homepage (e.g. "Countdown to i-FAB 2026"). Leave empty to use the site default.',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      city: 'city',
      country: 'country',
      startDate: 'startDate',
      media: 'images.0',
    },
    prepare({title, city, country, startDate, media}) {
      const location = [city, country].filter(Boolean).join(', ')
      const dateLabel = startDate
        ? new Date(startDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : undefined
      const subtitle = [location, dateLabel].filter(Boolean).join(' · ')
      return {
        title: title ?? 'Untitled',
        subtitle: subtitle || undefined,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Start date (newest first)',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
    {
      title: 'Start date (oldest first)',
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
  ],
})
