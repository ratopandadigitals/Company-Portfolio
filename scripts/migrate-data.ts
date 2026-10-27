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
        const result = await db.collection(migration.name).updateOne(
          { id: item.id },
          { $setOnInsert: item },
          { upsert: true },
        )

        inserted += result.upsertedCount
      }

      console.log(
        `${migration.name}: ${inserted} inserted; existing records preserved.`,
      )
    }

    console.log('Migration completed successfully.')
  } finally {
    await client.close()
  }
}

main().catch((error) => {
  console.error('Migration failed:', error)
  process.exitCode = 1
})
