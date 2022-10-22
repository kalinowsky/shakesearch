import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { ShortBookName } from "../services/contents"
import { extractBooksFromQuery, minSearchLength, SearchResultItem } from "../services/validation"

export const useSearchState = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const [bookSelectVisible, setBookSelectVisible] = useState(false)
  const [selectedBooks, setSelectedBooks] = useState<ShortBookName[]>([])
  const { query } = router

  useEffect(() => {
    const { q, books } = query || {}
    if (minSearchLength.safeParse(q).success) setSearchText(q as string)
    if (books) setSelectedBooks(extractBooksFromQuery(books))
  }, [query.q, query.books])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push({ pathname: "/search", query: { q: searchText, books: selectedBooks.join(",") } })
  }
  const showMore = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.replace(
      {
        pathname: "/search",
        query: { q: searchText, books: selectedBooks.join(","), all: true },
      },
      undefined,
      { scroll: false }
    )
  }

  const goToRead = (book: SearchResultItem["book"]) =>
    router.push({
      pathname: "/read",
      query: { book: book.shortName, page: book.page },
    })

  return {
    searchText,
    setSearchText,
    bookSelectVisible,
    setBookSelectVisible,
    selectedBooks,
    setSelectedBooks,
    query,
    goToRead,
    onSubmit,
    showMore,
  }
}

export type HeaderStateProps = ReturnType<typeof useSearchState>
