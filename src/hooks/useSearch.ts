import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ShortBookName } from "../services/contents"
import {
  isBooksArgument,
  minSearchLength,
  SearchResult,
  searchResultSchema,
} from "../services/validation"
import { Async, F2, ValueState } from "../types"
import { extractBooksFromQuery } from "../services/validation"

const API_URL = "/api/search?"

const buildUrl = (url: string, name: string, books: string[], all: boolean) =>
  `${url}phrase=${name}${books.length ? "&books=" + books.join(",") : ""}${all ? "&all=true" : ""}`

export const useSearch = (): {
  search: F2<string, ShortBookName[], Promise<void>>
  result: Async<SearchResult> | ValueState<"FetchingMore", SearchResult>
} => {
  const [results, setResults] = useState<
    Async<SearchResult> | ValueState<"FetchingMore", SearchResult>
  >({
    type: "NotFetched",
  })
  const { query } = useRouter()

  useEffect(() => {
    const { q, books } = query || {}
    if (typeof q === "string") search(q, extractBooksFromQuery(books))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.q, query.books, query.all])

  const search = async (name: string, books?: ShortBookName[]) => {
    setResults((state) =>
      state.type === "Fetched" ? { ...state, type: "FetchingMore" } : { type: "Fetching" }
    )
    if (!minSearchLength.safeParse(name).success)
      return setResults({ type: "Error", message: "Too short name" })
    if (!(typeof books === "undefined" || isBooksArgument(books)))
      return setResults({ type: "Error", message: "Invalid books" })
    try {
      const response = await fetch(buildUrl(API_URL, name, books || [], !!query.all))
      const data = await response.json()
      const validationResult = searchResultSchema.safeParse(data)
      if (validationResult.success) setResults({ type: "Fetched", value: validationResult.data })
      else setResults({ type: "Error", message: "Could not validate incoming data" })
    } catch (err) {
      setResults({ type: "Error", message: String(err) })
    }
  }

  return { search, result: results }
}
