import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "@/sanity/client";

const COMMITTEE_QUERY = `*[_type == "committeeMember"] | order(name asc) {
  _id,
  name,
  role,
  image,
  university,
  country,
  contactUrl,
  socialUrl
}`;

const CONGRESS_QUERY = `*[_type == "congress"] | order(startDate desc) {
  _id,
  title,
  slug,
  venue,
  city,
  country,
  startDate,
  endDate,
  editionNumber,
  description,
  images,
  journalUrl
}`;

const options = { next: { revalidate: 30 } };

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

type CommitteeMember = {
  _id: string;
  name: string;
  role: string;
  image?: (SanityImageSource & { alt?: string | null }) | null;
  university?: string | null;
  country?: string | null;
  contactUrl?: string | null;
  socialUrl?: string | null;
};

type Congress = {
  _id: string;
  title: string;
  slug?: { current?: string | null } | null;
  venue?: string | null;
  city?: string | null;
  country?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  editionNumber?: number | null;
  description?: unknown;
  images?: Array<SanityImageSource & { alt?: string | null; caption?: string | null }> | null;
  journalUrl?: string | null;
};

function textOrDash(value: unknown) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

export default async function IndexPage() {
  const [committee, congresses] = await Promise.all([
    client.fetch<CommitteeMember[]>(COMMITTEE_QUERY, {}, options),
    client.fetch<Congress[]>(CONGRESS_QUERY, {}, options),
  ]);

  return (
    <main>
      <h1>CMS validation (Sanity)</h1>

      <section>
        <h2>Committee members ({committee.length})</h2>
        {committee.length === 0 ? (
          <p>No committee members in dataset.</p>
        ) : (
          <ul>
            {committee.map((m) => {
              const imageSrc = m.image ? urlFor(m.image)?.url() : undefined;
              return (
              <li key={m._id}>
                <p>
                  <strong>_id:</strong> {m._id}
                </p>
                <p>
                  <strong>name:</strong> {textOrDash(m.name)}
                </p>
                <p>
                  <strong>role:</strong> {textOrDash(m.role)}
                </p>
                <div>
                  <strong>image:</strong>
                  {!m.image ? (
                    <span> —</span>
                  ) : (
                    <>
                      <p>
                        <strong>url:</strong>{" "}
                        {imageSrc ? (
                          <>
                            <a href={imageSrc}>{imageSrc}</a>
                            <br />
                            {/* eslint-disable-next-line @next/next/no-img-element -- validation page */}
                            <img
                              src={imageSrc}
                              alt={m.image.alt ?? ""}
                              width={200}
                            />
                          </>
                        ) : (
                          "— (could not build URL)"
                        )}
                      </p>
                      <p>
                        <strong>alt:</strong> {textOrDash(m.image.alt)}
                      </p>
                    </>
                  )}
                </div>
                <p>
                  <strong>university:</strong> {textOrDash(m.university)}
                </p>
                <p>
                  <strong>country:</strong> {textOrDash(m.country)}
                </p>
                <p>
                  <strong>contactUrl:</strong>{" "}
                  {m.contactUrl ? (
                    <a href={m.contactUrl}>{m.contactUrl}</a>
                  ) : (
                    "—"
                  )}
                </p>
                <p>
                  <strong>socialUrl:</strong>{" "}
                  {m.socialUrl ? <a href={m.socialUrl}>{m.socialUrl}</a> : "—"}
                </p>
              </li>
            );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2>Congresses ({congresses.length})</h2>
        {congresses.length === 0 ? (
          <p>No congresses in dataset.</p>
        ) : (
          <ul>
            {congresses.map((c) => (
              <li key={c._id}>
                <p>
                  <strong>_id:</strong> {c._id}
                </p>
                <p>
                  <strong>title:</strong> {textOrDash(c.title)}
                </p>
                <p>
                  <strong>slug.current:</strong> {textOrDash(c.slug?.current)}
                </p>
                <p>
                  <strong>venue:</strong> {textOrDash(c.venue)}
                </p>
                <p>
                  <strong>city:</strong> {textOrDash(c.city)}
                </p>
                <p>
                  <strong>country:</strong> {textOrDash(c.country)}
                </p>
                <p>
                  <strong>startDate:</strong>{" "}
                  {c.startDate
                    ? new Date(c.startDate).toISOString()
                    : "—"}
                </p>
                <p>
                  <strong>endDate:</strong>{" "}
                  {c.endDate ? new Date(c.endDate).toISOString() : "—"}
                </p>
                <p>
                  <strong>editionNumber:</strong>{" "}
                  {c.editionNumber !== null && c.editionNumber !== undefined
                    ? String(c.editionNumber)
                    : "—"}
                </p>
                <div>
                  <strong>description (PortableText):</strong>
                  {Array.isArray(c.description) && c.description.length > 0 ? (
                    <PortableText value={c.description} />
                  ) : (
                    <span> —</span>
                  )}
                </div>
                <div>
                  <strong>images:</strong>
                  {!c.images || c.images.length === 0 ? (
                    <span> —</span>
                  ) : (
                    <ul>
                      {c.images.map((img, i) => {
                        const src = urlFor(img)?.url();
                        return (
                          <li key={i}>
                            <p>
                              <strong>url:</strong>{" "}
                              {src ? (
                                <>
                                  <a href={src}>{src}</a>
                                  <br />
                                  {/* eslint-disable-next-line @next/next/no-img-element -- validation page, no styling requirement */}
                                  <img src={src} alt={img.alt ?? ""} width={200} />
                                </>
                              ) : (
                                "— (could not build URL)"
                              )}
                            </p>
                            <p>
                              <strong>alt:</strong> {textOrDash(img.alt)}
                            </p>
                            <p>
                              <strong>caption:</strong> {textOrDash(img.caption)}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <p>
                  <strong>journalUrl:</strong>{" "}
                  {c.journalUrl ? (
                    <a href={c.journalUrl}>{c.journalUrl}</a>
                  ) : (
                    "—"
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
