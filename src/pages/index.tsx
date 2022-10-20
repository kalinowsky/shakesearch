import type { NextPage } from "next"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import styled from "styled-components"
import { BookSelect } from "../components/BookSelect"
import { Header } from "../components/Header"
import { SearchResult } from "../components/SearchResult"
import { useSearch } from "../hooks/useSearch"
import { ShortBookName } from "../services/contents"
import { extractBooksFromQuery } from "../services/validation"

export type Result = {
  book: ShortBookName
  results: {
    value: string
    index: number
    isTitle: boolean
    title: string
    refIndex: number
    item: string
  }
  context: { next: string; previous: string; page: number }
}

const Search: NextPage = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const [bookSelectVisible, setBookSelectVisible] = useState(true)
  const [selectedBooks, setSelectedBooks] = useState<ShortBookName[]>([])

  const { search, results } = useSearch()

  useEffect(() => {
    const { q, books } = router.query || {}
    if (typeof q === "string") search(q, extractBooksFromQuery(books))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q, router.query.books])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push({ pathname: "/", query: { q: searchText, books: selectedBooks.join(",") } })
  }

  return (
    <div>
      <Header fullHeight={false} onSubmit={onSubmit} value={searchText} setValue={setSearchText} />
      {results.type === "Fetched" && (
        <ResultsWrapper>
          {results.value.map((v) => (
            <SearchResult
              key={v.book.line}
              result={v}
              searchText={searchText}
              onClick={(v) =>
                router.push({
                  pathname: "/read",
                  query: { book: v.book.shortName, page: v.book.page },
                })
              }
            />
          ))}
        </ResultsWrapper>
      )}
      <BookSelect
        visible={bookSelectVisible}
        onClose={(books) => {
          setSelectedBooks(books)
          setBookSelectVisible(false)
        }}
      />
    </div>
  )
}

export default Search

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
