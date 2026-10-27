import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const main = async () => {
  const { default: clientPromise } = await import('../src/lib/mongodb')
  const client = await clientPromise

  try {
    const db = client.db('rato_panda_portfolio')
    const collections = await db.listCollections().toArray()

    console.log('\nMongoDB collections and document counts:\n')

    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments()
      console.log(`${collection.name}: ${count} documents`)
    }

    console.log('\nVerification completed.')
  } finally {
    await client.close()
  }
}

main().catch((error) => {
  console.error('Verification failed:', error.message)
  process.exitCode = 1
})
