import {defineField, defineType} from 'sanity'

/**
 * A submission from the public "Join i-FAB" form.
 *
 * These documents are created by the website (`/api/join`) using a write token,
 * never by hand in the Studio. The type is read-only so an editor cannot
 * silently alter what somebody actually submitted — the record is evidence of a
 * submission, not editable content. Deleting is still allowed, which is what
 * handling an erasure request needs.
 */
export default defineType({
  name: 'joinSubmission',
  title: 'Join submission',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({name: 'fullName', title: 'Full name', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'employer', title: 'Employer', type: 'string'}),
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({name: 'country', title: 'Country', type: 'string'}),
    defineField({
      name: 'mainRole',
      title: 'Main role',
      type: 'string',
      options: {
        list: [
          {title: 'Academic', value: 'academic'},
          {title: 'Industry', value: 'industry'},
          {title: 'Clinician', value: 'clinician'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'otherRole',
      title: 'Other role',
      description: 'Free text, filled in when the main role is "Other"',
      type: 'string',
    }),
    defineField({name: 'submittedAt', title: 'Submitted at', type: 'datetime'}),
  ],
  preview: {
    select: {
      title: 'fullName',
      email: 'email',
      mainRole: 'mainRole',
      otherRole: 'otherRole',
      employer: 'employer',
      country: 'country',
      submittedAt: 'submittedAt',
    },
    prepare({title, email, mainRole, otherRole, employer, country, submittedAt}) {
      const roleLabels: Record<string, string> = {
        academic: 'Academic',
        industry: 'Industry',
        clinician: 'Clinician',
        other: 'Other',
      }
      const role =
        mainRole === 'other' && otherRole
          ? `Other — ${otherRole}`
          : (roleLabels[mainRole as string] ?? mainRole)
      const where = [employer, country].filter(Boolean).join(', ')
      const when = submittedAt
        ? new Date(submittedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : undefined
      return {
        title: title ?? email ?? 'Unnamed submission',
        subtitle: [role, where, when].filter(Boolean).join(' · '),
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
