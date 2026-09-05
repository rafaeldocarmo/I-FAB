import {defineField, defineType} from 'sanity'

/**
 * A submission from the public "Join i-FAB" form.
 *
 * These documents are created by the website (`/api/join`) using a write token,
 * never by hand in the Studio. Every field is read-only so an editor cannot
 * silently alter what somebody actually submitted — the record is evidence of a
 * submission, not editable content.
 *
 * `readOnly` is set per field rather than on the document type on purpose:
 * marking the whole type read-only also disables the document actions, which
 * would take away deletion — exactly what is needed to honour an erasure
 * request. Field-level read-only affects the form inputs only.
 *
 * None of this constrains the HTTP API, which is how the site writes.
 */
export default defineType({
  name: 'joinSubmission',
  title: 'Join submission',
  type: 'document',
  fields: [
    defineField({name: 'fullName', title: 'Full name', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Email', type: 'string', readOnly: true}),
    defineField({name: 'employer', title: 'Employer', type: 'string', readOnly: true}),
    defineField({name: 'city', title: 'City', type: 'string', readOnly: true}),
    defineField({name: 'country', title: 'Country', type: 'string', readOnly: true}),
    defineField({
      name: 'mainRole',
      title: 'Main role',
      description: 'Free text, as typed by the submitter',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'researchLine',
      title: 'Research line',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      description: 'Free text the submitter chose to add',
      type: 'text',
      rows: 6,
      readOnly: true,
    }),
    defineField({
      name: 'communicationsConsent',
      title: 'Consented to email updates',
      description:
        'Only submissions with this ticked may be added to a mailing list. Consent given here cannot be assumed for anyone who left it unticked.',
      type: 'boolean',
      readOnly: true,
    }),
    defineField({
      name: 'consentText',
      title: 'Consent wording shown',
      description: 'The exact text the person agreed to, kept as proof',
      type: 'text',
      rows: 3,
      readOnly: true,
    }),
    defineField({
      name: 'consentVersion',
      title: 'Consent version',
      type: 'string',
      readOnly: true,
    }),
    defineField({name: 'submittedAt', title: 'Submitted at', type: 'datetime', readOnly: true}),
  ],
  preview: {
    select: {
      title: 'fullName',
      email: 'email',
      mainRole: 'mainRole',
      researchLine: 'researchLine',
      communicationsConsent: 'communicationsConsent',
      employer: 'employer',
      country: 'country',
      submittedAt: 'submittedAt',
    },
    prepare({title, email, mainRole, researchLine, employer, country, submittedAt, communicationsConsent}) {
      const role = [mainRole, researchLine].filter(Boolean).join(' · ')
      const where = [employer, country].filter(Boolean).join(', ')
      const optIn = communicationsConsent ? '✉ opted in' : undefined
      const when = submittedAt
        ? new Date(submittedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : undefined
      return {
        title: title ?? email ?? 'Unnamed submission',
        subtitle: [role, where, when, optIn].filter(Boolean).join(' · '),
      }
    },
  },
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Oldest first',
      name: 'submittedAtAsc',
      by: [{field: 'submittedAt', direction: 'asc'}],
    },
    {title: 'Name A–Z', name: 'nameAsc', by: [{field: 'fullName', direction: 'asc'}]},
  ],
})
