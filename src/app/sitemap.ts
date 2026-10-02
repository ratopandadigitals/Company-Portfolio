import type { MetadataRoute } from "next"
import { EVENTS_DATA } from "@/data/events"
import { WORK_ITEMS } from "@/data/works"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ratopandadigitals.com"

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...WORK_ITEMS.map((work) => `/works/${work.slug}`),
    ...EVENTS_DATA.map((event) => `/events/${event.slug}`),
  ]

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }))
}