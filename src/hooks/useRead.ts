import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ShortBookName } from "../services/contents"
import {
  getValidatedPageNumber,
  isBookShortName,
  ReadResult,
  readResultSchema,
} from "../services/validation"
import { Async, F0, F1 } from "../types"

const API_URL = "/api/read?"

const buildUrl = (url: string, book: ShortBookName, page: number) =>
  `${url}book=${book}&page=${page}`

export const useRead = (): {
  goToPage: F1<"next" | "previous", F0>
  canGoToPage: F1<"next" | "previous", boolean>
  results: Async<ReadResult>
} => {
  const router = useRouter()
  const [results, setResults] = useState<Async<ReadResult>>({ type: "NotFetched" })
  const pageNumber = getValidatedPageNumber(router.query.page)

  useEffect(() => {
    const { book } = router.query || {}
    if (!isBookShortName(book)) return setResults({ type: "Error", message: "Invalid book" })

    if (pageNumber.type === "Error") return setResults({ type: "Error", message: "Invalid page" })
    read(book, pageNumber.value)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.book, router.query.page])

  const read = async (book: ShortBookName, page: number) => {
    try {
      const response = await fetch(buildUrl(API_URL, book, page))
      const data = await response.json()
      const validationResult = readResultSchema.safeParse(data)
      if (validationResult.success) setResults({ type: "Fetched", value: validationResult.data })
      else setResults({ type: "Error", message: "Could not validate incoming data" })
    } catch (err) {
      setResults({ type: "Error", message: String(err) })
    }
  }

  const goToPage = (move: "next" | "previous") => () => {
    if (pageNumber.type === "Error" || (pageNumber.value === 0 && move === "previous")) return
    router.push({
      pathname: "/read",
      query: {
        book: router.query.book,
        page: move === "next" ? pageNumber.value + 1 : pageNumber.value - 1,
      },
    })
  }

  const canGoToPage = (move: "next" | "previous") => {
    if (pageNumber.type === "Error") return true
    if (pageNumber.value === 0 && move === "previous") return true
    if (
      results.type === "Fetched" &&
      pageNumber.value === results.value.book.size - 1 &&
      move === "next"
    )
      return true
    return false
  }

  return { goToPage, results, canGoToPage }
}
