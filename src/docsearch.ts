import algoliasearch from 'algoliasearch'
import { InlineQueryResultArticle } from 'telegram-typings'
import outdent from 'outdent'
import { Component, escape } from './utils'

export const docsearch: Component = (telegraf) => {
  telegraf.on('inline_query', async (ctx) => {
    const { ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME } = process.env
    if (!ALGOLIA_API_KEY || !ALGOLIA_INDEX_NAME) {
      const message_text = 'No ALGOLIA_API_KEY or ALGOLIA_INDEX_NAME provided'

      return ctx.answerInlineQuery([
        {
          type: 'article',
          id: '0',
          title: message_text,
          input_message_content: {
            message_text,
          },
        },
      ])
    }

    // appID: https://github.com/algolia/docsearch/blob/7c1d293af9b828cf2553d7ea61c54eb78f4dc882/src/lib/DocSearch.js#L36
    const client = algoliasearch('BH4D9OD16A', ALGOLIA_API_KEY)
    const index = client.initIndex(ALGOLIA_INDEX_NAME)

    const { hits } = await index.search<{
      hierarchy: Record<string, string | null>
      content: string | null
      url: string
    }>(ctx.inlineQuery!.query)

    const results: InlineQueryResultArticle[] = hits
      .filter((hit) => !hit.url.includes('qv2ray.net/en'))
      .map(({ hierarchy, url, content, objectID }) => {
        const title = Object.values(hierarchy)
          .slice(1)
          .filter(Boolean)
          .join(' » ')

        return {
          type: 'article',
          id: objectID,
          title,
          url,
          ...(content ? { description: content } : {}),
          input_message_content: {
            parse_mode: 'MarkdownV2',
            message_text: outdent`
              *[${escape(title)}](${url})*
              ${content ? escape(content) : ''}
            `,
            disable_web_page_preview: true,
          },
        }
      })

    ctx.answerInlineQuery(results, {
      // https://docsearch.algolia.com/docs/scraper/#when
      cache_time: 86400,
    })
  })
}
