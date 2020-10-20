import { NowRequest, NowResponse } from '@vercel/node'
import { telegraf, register } from '../src'
import { handlers } from '../src/utils'

export default async ({ body }: NowRequest, res: NowResponse) => {
  handlers.response = res

  register()
  return telegraf.handleUpdate(body, res)
}
