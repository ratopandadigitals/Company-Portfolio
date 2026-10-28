import type { MetadataRoute } from "next"
import clientPromise from "@/lib/mongodb"
import type { EventDocument, WorkDocument } from "@/types/database"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ratopandadigitals.com"

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = await clientPromise
  const db = client.db('rato_panda_portfolio')
  const [works, events] = await Promise.all([
    db
      .collection<WorkDocument>('works')
      .find({}, { projection: { slug: 1 } })
      .toArray(),
    db
      .collection<EventDocument>('events')
      .find({}, { projection: { slug: 1 } })
      .toArray(),
  ])

  const routes = [
    "",
    "/about",
    "/services",
    "/works",
    "/events",
    "/gallery",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    ...works.map((work) => `/works/${work.slug}`),
    ...events.map((event) => `/events/${event.slug}`),
  ]

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }))
}