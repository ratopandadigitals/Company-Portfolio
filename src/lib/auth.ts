import { betterAuth } from 'better-auth'
import { mongodbAdapter } from '@better-auth/mongo-adapter'
import { client } from '@/lib/mongodb'

export const auth = betterAuth({
  appName: 'Rato Panda Digitals',
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(client.db('rato_panda_portfolio'), {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
  },
})