/** GROQ for congress list — keep in sync with `Congress` in `@/lib/types`. */
export const CONGRESS_LIST_QUERY = `*[_type == "congress"] | order(startDate desc) {
  _id, title, slug, venue, city, country, startDate, endDate,
  editionNumber, description, images,
  journalItems[] {
    _key,
    kind,
    label,
    url,
    file {
      asset->{ url, originalFilename }
    },
    image {
      alt,
      asset->{ url }
    }
  },
  journalLinkType, journalUrl,
  journalPdf {
    asset->{
      url,
      originalFilename
    }
  },
  homeEyebrow
}`;
