import { useState } from "react"
import { ShortBookName } from "../services/contents"
import {
  isBooksArgument,
  minSearchLength,
  SearchResult,
  searchResultsSchema,
} from "../services/validation"
import { Async, F2 } from "../types"

const API_URL = "/api/search?"

const buildUrl = (url: string, name: string, books: string[]) =>
  `${url}phrase=${name}${books.length ? "&books=" + books.join(",") : ""}`

export const useSearch = (): {
  search: F2<string, ShortBookName[], Promise<void>>
  results: Async<SearchResult[]>
} => {
  const [results, setResults] = useState<Async<SearchResult[]>>({ type: "NotFetched" })

  // useEffect(() => {
  //   const { q, books } = state.query || {}
  //   if (typeof q === "string") search(q, extractBooksFromQuery(books))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.query.q, state.query.books])

  const search = async (name: string, books?: ShortBookName[]) => {
    if (!minSearchLength.safeParse(name).success)
      return setResults({ type: "FetchError", value: "Too short name" })
    if (!(typeof books === "undefined" || isBooksArgument(books)))
      return setResults({ type: "FetchError", value: "Invalid books" })
    try {
      const response = await fetch(buildUrl(API_URL, name, books || []))
      const data = await response.json()
      const validationResult = searchResultsSchema.safeParse(data)
      if (validationResult.success) setResults({ type: "Fetched", value: validationResult.data })
      else setResults({ type: "FetchError", value: "Could not validate incoming data" })
    } catch (err) {
      setResults({ type: "FetchError", value: String(err) })
    }
  }

  return { search, results }
}
