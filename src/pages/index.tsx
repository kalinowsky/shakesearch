import type { NextPage } from "next"
import { useEffect } from "react"
import styled from "styled-components"
import { BookSelect } from "../components/BookSelect"
import { Header } from "../components/Header"
import { SearchResult } from "../components/SearchResult"
import { useSearchState } from "../hooks/useSearchState"
import { useSearch } from "../hooks/useSearch"
import { extractBooksFromQuery } from "../services/validation"

const Search: NextPage = (props) => {
  const state = useSearchState()
  const { search, results } = useSearch()

  useEffect(() => {
    const { q, books } = state.query || {}
    if (typeof q === "string") search(q, extractBooksFromQuery(books))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.query.q, state.query.books])

  return (
    <div>
      <Header {...state} />
      {results.type === "Fetching" && "loading"}
      {results.type === "FetchError" && results.value}
      {results.type === "Fetched" && (
        <ResultsWrapper>
          {results.value.map((v) => (
            <SearchResult
              key={v.book.line}
              result={v}
              searchText={state.searchText}
              onClick={() => state.goToRead(v.book)}
            />
          ))}
        </ResultsWrapper>
      )}
      {state.bookSelectVisible && (
        <BookSelect
          {...state}
          visible={state.bookSelectVisible}
          onClose={(books) => {
            state.setSelectedBooks(books)
            state.setBookSelectVisible(false)
          }}
        />
      )}
    </div>
  )
}

export default Search

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
