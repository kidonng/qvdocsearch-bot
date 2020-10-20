import Telegraf from 'telegraf'
import { docsearch } from './docsearch'
import { fallback } from './fallback'
import { IContext } from './utils'

const { BOT_TOKEN, IS_VERCEL } = process.env

export const telegraf = new Telegraf<IContext>(BOT_TOKEN!)
export const register = () => {
  const components = [docsearch, fallback]
  for (const component of components) component(telegraf)
}

if (!IS_VERCEL) {
  telegraf.webhookReply = false

  register()
  telegraf.launch()
}
