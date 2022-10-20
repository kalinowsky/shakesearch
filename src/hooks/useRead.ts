import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { ShortBookName } from "../services/contents"
import { getValidatedPageNumber, isBookShortName, readResultSchema } from "../services/validation"
import { Async, F0, F1 } from "../types"

const API_URL = "/api/read?"

const buildUrl = (url: string, book: ShortBookName, page: number) =>
  `${url}book=${book}&page=${page}`

export const useRead = (): {
  goToPage: F1<"next" | "previous", F0>
  results: Async<string[]>
} => {
  const router = useRouter()
  const [results, setResults] = useState<Async<string[]>>({ type: "NotFetched" })

  useEffect(() => {
    const { book, page } = router.query || {}
    if (!isBookShortName(book)) return setResults({ type: "Error", message: "Invalid book" })

    const pageNumber = getValidatedPageNumber(page)
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
    const { page } = router.query
    const pageNumber = getValidatedPageNumber(page)
    if (pageNumber.type === "Error" || (pageNumber.value === 0 && move === "previous")) return
    router.push({
      pathname: "/read",
      query: {
        book: router.query.book,
        page: move === "next" ? pageNumber.value + 1 : pageNumber.value - 1,
      },
    })
  }

  return { goToPage, results }
}
