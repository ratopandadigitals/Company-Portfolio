import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const main = async () => {
  const [
    { default: clientPromise },
    { WORK_ITEMS },
    { SERVICES_DATA },
    { mediaItems },
    { STATS_ITEMS, TESTIMONIALS_ITEMS },
  ] = await Promise.all([
    import('../src/lib/mongodb'),
    import('../src/data/works'),
    import('../src/components/sections/services/Service'),
    import('../src/components/sections/gallery/MediaData'),
    import('../src/data/client'),
  ])

  const client = await clientPromise

  try {
    const db = client.db('rato_panda_portfolio')

    const events = db.collection<{ id: string; slug: string }>('events')
    await events.createIndex(
      { slug: 1 },
      { unique: true, name: 'events_slug_unique' },
    )
    await events.createIndex(
      { date: 1, id: 1 },
      { name: 'events_date_id_order' },
    )

    const highestEventId = await events.aggregate<{ maxId: number }>([
      {
        $project: {
          numericId: {
            $convert: { input: '$id', to: 'int', onError: 0, onNull: 0 },
          },
        },
      },
      { $group: { _id: null, maxId: { $max: '$numericId' } } },
    ]).next()

    await db.collection<{ _id: string; sequence: number }>('counters').updateOne(
      { _id: 'events' },
      { $max: { sequence: highestEventId?.maxId ?? 0 } },
      { upsert: true },
    )

    const works = db.collection<{ slug: string }>('works')
    await works.createIndex(
      { slug: 1 },
      { unique: true, name: 'works_slug_unique' },
    )
    await works.createIndex(
      { id: 1 },
      { name: 'works_id_order' },
    )

    const gallery = db.collection<{ id: number }>('gallery')
    await gallery.createIndex(
      { id: 1 },
      { unique: true, name: 'gallery_id_unique' },
    )

    const services = db.collection<{ id: string; label: string }>('services')
    await services.createIndex(
      { id: 1 },
      { unique: true, name: 'services_id_unique' },
    )
    await services.createIndex(
      { label: 1 },
      {
        unique: true,
        name: 'services_label_case_insensitive_unique',
        collation: { locale: 'en', strength: 2 },
      },
    )

    const testimonials = db.collection<{ id: string }>('testimonials')
    await testimonials.createIndex(
      { id: 1 },
      { unique: true, name: 'testimonials_id_unique' },
    )

    const notifications = db.collection<{ createdAt: string; readBy: string[] }>('admin_notifications')
    await notifications.createIndex(
      { createdAt: -1 },
      { name: 'admin_notifications_created_at' },
    )
    await notifications.createIndex(
      { readBy: 1, createdAt: -1 },
      { name: 'admin_notifications_unread_by_user' },
    )

    const migrations = [
      { name: 'works', items: WORK_ITEMS },
      { name: 'services', items: SERVICES_DATA },
      { name: 'gallery', items: mediaItems },
      { name: 'stats', items: STATS_ITEMS },
      { name: 'testimonials', items: TESTIMONIALS_ITEMS },
    ]

    for (const migration of migrations) {
      let inserted = 0

      for (const item of migration.items) {
        const key = migration.name === 'works'
          ? { slug: (item as { slug: string }).slug }
          : { id: (item as { id: string }).id }
        const result = await db.collection(migration.name).updateOne(
          key,
          { $setOnInsert: item },
          { upsert: true },
        )

        inserted += result.upsertedCount
      }

      console.log(
        `${migration.name}: ${inserted} inserted; existing records preserved.`,
      )
    }

    await db.collection<{ _id: string; sequence: number }>('counters').updateOne(
      { _id: 'works' },
      { $setOnInsert: { sequence: 0 } },
      { upsert: true },
    )

    const highestServiceId = await services.aggregate<{ maxId: number }>([
      {
        $project: {
          numericId: {
            $convert: { input: '$id', to: 'int', onError: 0, onNull: 0 },
          },
        },
      },
      { $group: { _id: null, maxId: { $max: '$numericId' } } },
    ]).next()

    await db.collection<{ _id: string; sequence: number }>('counters').updateOne(
      { _id: 'services' },
      { $max: { sequence: highestServiceId?.maxId ?? 0 } },
      { upsert: true },
    )

    const highestGalleryId = await gallery.find({}).sort({ id: -1 }).limit(1).next()
    await db.collection<{ _id: string; sequence: number }>('counters').updateOne(
      { _id: 'gallery' },
      { $max: { sequence: highestGalleryId?.id ?? 0 } },
      { upsert: true },
    )

    const highestTestimonialId = await testimonials.aggregate<{ maxId: number }>([
      {
        $project: {
          numericId: {
            $convert: { input: '$id', to: 'int', onError: 0, onNull: 0 },
          },
        },
      },
      { $group: { _id: null, maxId: { $max: '$numericId' } } },
    ]).next()

    await db.collection<{ _id: string; sequence: number }>('counters').updateOne(
      { _id: 'testimonials' },
      { $max: { sequence: highestTestimonialId?.maxId ?? 0 } },
      { upsert: true },
    )

    console.log('Migration completed successfully.')
  } finally {
    await client.close()
  }
}

main().catch((error) => {
  console.error('Migration failed:', error)
  process.exitCode = 1
})
