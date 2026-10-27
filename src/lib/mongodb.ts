
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

const options = {}

declare global {
  
  var _mongoClient: MongoClient | undefined

  
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

const createMongoClient = (): MongoClient => new MongoClient(uri, options)

const client: MongoClient =
  process.env.NODE_ENV === 'development'
    ? (global._mongoClient ??= createMongoClient())
    : createMongoClient()

const clientPromise: Promise<MongoClient> =
  process.env.NODE_ENV === 'development'
    ? (global._mongoClientPromise ??= client.connect())
    : client.connect()

export { client, clientPromise }
export default clientPromise
