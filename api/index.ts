import { VercelRequest, VercelResponse } from '@vercel/node'
import { telegraf } from '../src'

export default async ({ body }: VercelRequest, res: VercelResponse) => {
  return telegraf.handleUpdate(body, res)
}
