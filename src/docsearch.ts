import algoliasearch from 'algoliasearch'
import { InlineQueryResultArticle } from 'telegram-typings'
import outdent from 'outdent'
import { Component, escape } from './utils'

// appID: https://github.com/algolia/docsearch/blob/7c1d293af9b828cf2553d7ea61c54eb78f4dc882/src/lib/DocSearch.js#L36
const client = algoliasearch('BH4D9OD16A', 'f0da09ddb339a1b1fabe6ac3fbd78f42')
const index = client.initIndex('qv2ray')

export const docsearch: Component = (telegraf) => {
  telegraf.on('inline_query', async (ctx) => {
    const { id, query } = ctx.inlineQuery!

    const { hits } = await index.search<{
      hierarchy: Record<string, string | null>
      content: string | null
      url: string
    }>(query)

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

    ctx.telegram.answerInlineQuery(id, results)
  })
}
