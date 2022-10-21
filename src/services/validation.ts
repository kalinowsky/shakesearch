import { z } from "zod"
import { ArrayItem, Either } from "../types"
import { ShortBookName, decalredShortNames, shortNames } from "./contents"

export const isBookShortName = (v: string | string[] | undefined): v is ShortBookName =>
  typeof v === "string" && shortNames.includes(v as ShortBookName)

export const isString = (v: string | string[] | undefined): v is string => typeof v === "string"
export const isBooksArgument = (v: string | string[] | undefined): v is ShortBookName[] =>
  !!(v && Array.isArray(v) && v.every((book) => shortNames.includes(book as ShortBookName)))

export const extractBooksFromQuery = (bookQuery: string | string[] | undefined) => {
  if (bookQuery === undefined || bookQuery === "") return []
  if (typeof bookQuery === "string") return bookQuery.split(",").filter(isBookShortName)
  return bookQuery.filter(isBookShortName)
}

export const getValidatedPageNumber = (page: string | string[] | undefined): Either<number> => {
  const message = "Invalid page"
  if (page === undefined || Array.isArray(page)) return { type: "Error", message }
  const pageNumber = parseInt(page)
  if (
    typeof pageNumber !== "number" ||
    isNaN(pageNumber) ||
    pageNumber < 0 ||
    !Number.isInteger(pageNumber)
  )
    return { type: "Error", message }
  return { type: "Ok", value: pageNumber }
}

export const readResultSchema = z.object({
  book: z.object({
    size: z.number(),
  }),
  content: z.array(z.string()),
})

export const minSearchLength = z.string().min(4)

export const shortNamesSchema = z.enum(decalredShortNames)
export const searchResultSchema = z.object({
  total: z.number(),
  search: z.object({
    phrase: z.string(),
    books: z.array(shortNamesSchema),
  }),
  items: z.array(
    z.object({
      book: z.object({
        shortName: shortNamesSchema,
        line: z.number(),
        page: z.number(),
        size: z.number(),
      }),
      context: z.object({
        next: z.string(),
        previous: z.string(),
      }),
      value: z.string(),
      score: z.number(),
    })
  ),
})

export type SearchResult = z.infer<typeof searchResultSchema>
export type ReadResult = z.infer<typeof readResultSchema>

export type SearchResultItem = ArrayItem<SearchResult["items"]>
