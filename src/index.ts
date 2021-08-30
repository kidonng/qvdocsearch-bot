import { Telegraf } from 'telegraf'

const { BOT_TOKEN, IS_VERCEL } = process.env

export const telegraf = new Telegraf(BOT_TOKEN!)
require('./docsearch')

if (!IS_VERCEL) {
  telegraf.telegram.webhookReply = false

  telegraf.launch()
}
