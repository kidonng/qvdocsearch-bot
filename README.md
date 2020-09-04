# 🔍 [Qv2ray](https://github.com/Qv2ray) DocSearch bot

Source code for Telegram bot [@Qvdocsearchbot](https://t.me/Qvdocsearchbot), an inline bot for searching [Qv2ray documentation](https://qv2ray.net) using [DocSearch](https://docsearch.algolia.com/). It can also be configured to search any website using DocSearch.

## Setup

The following environment variables should be provided:

- `BOT_TOKEN`: Telegram bot token. [Click here](http://t.me/BotFather) to create a bot.
- `ALGOLIA_API_KEY`: DocSearch API key.
- `ALGOLIA_INDEX_NAME`: DocSearch index name.

You should also change or remove [the search result filter](https://github.com/kidonng/qvdocsearch-bot/blob/820373e8b669d31d623d2de74c5f0bb0b25899c7/src/docsearch.ts#L21).

### Using [Vercel](http://vercel.com/) and Webhooks (recommended)

1. Configure the environment variables in [`vercel.json`](vercel.json).
2. [Deploy to Vercel](https://vercel.com/import/project?template=http://github.com/kidonng/qvdocsearch-bot).
3. [Set up the Webhook](https://core.telegram.org/bots/api#setwebhook): `https://api.telegram.org/bot<token>/setWebhook?url=<url>` (**Make sure to use a private URL!**)

### Using polling

1. Configure the environment variables.
2. Run `src/index.ts` to launch the bot.
