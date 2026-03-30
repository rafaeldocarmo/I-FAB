import {defineField, defineType} from 'sanity'

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
      name: 'journalLinkType',
      title: 'Journal / proceedings type',
      description: 'Choose whether to link to a website or attach a PDF file.',
      type: 'string',
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
      title: 'Journal URL',
      description: 'HTTPS link to the journal or proceedings page.',
      type: 'url',
      hidden: ({parent}) => parent?.journalLinkType === 'pdf',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'journalPdf',
      title: 'Journal PDF',
      description: 'Upload a PDF (e.g. proceedings). Visitors will get a download/open link.',
      type: 'file',
      hidden: ({parent}) => parent?.journalLinkType !== 'pdf',
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
