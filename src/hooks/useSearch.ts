import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ShortBookName } from "../services/contents"
import {
  isBooksArgument,
  minSearchLength,
  SearchResult,
  searchResultsSchema,
} from "../services/validation"
import { Async, F2 } from "../types"
import { extractBooksFromQuery } from "../services/validation"

const API_URL = "/api/search?"

const buildUrl = (url: string, name: string, books: string[]) =>
  `${url}phrase=${name}${books.length ? "&books=" + books.join(",") : ""}`

export const useSearch = (): {
  search: F2<string, ShortBookName[], Promise<void>>
  results: Async<SearchResult[]>
} => {
  const [results, setResults] = useState<Async<SearchResult[]>>({ type: "NotFetched" })
  const { query } = useRouter()

  useEffect(() => {
    const { q, books } = query || {}
    if (typeof q === "string") search(q, extractBooksFromQuery(books))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.q, query.books])

  const search = async (name: string, books?: ShortBookName[]) => {
    if (!minSearchLength.safeParse(name).success)
      return setResults({ type: "Error", message: "Too short name" })
    if (!(typeof books === "undefined" || isBooksArgument(books)))
      return setResults({ type: "Error", message: "Invalid books" })
    try {
      const response = await fetch(buildUrl(API_URL, name, books || []))
      const data = await response.json()
      const validationResult = searchResultsSchema.safeParse(data)
      if (validationResult.success) setResults({ type: "Fetched", value: validationResult.data })
      else setResults({ type: "Error", message: "Could not validate incoming data" })
    } catch (err) {
      setResults({ type: "Error", message: String(err) })
    }
  }

  return { search, results }
}
