import { ParsedUrlQuery } from 'querystring'

export type ProductQueryString = ParsedUrlQuery & {
  name: string
  category: string[]
  variant: string
  limit: string
}
