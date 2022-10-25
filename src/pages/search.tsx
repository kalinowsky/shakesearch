import React from "react"
import styled from "styled-components"
import { Button } from "../components/Button"
import { InfoText } from "../components/InfoText"
import { SearchResult } from "../components/SearchResult"
import { Spinner } from "../components/Spinner"
import { useSearch } from "../hooks/useSearch"
import { PageProps } from "../types"

const SearchResults: PageProps = (props) => {
  const { results } = useSearch()
  const { state } = props
  return (
    <>
      {results.type === "Fetching" && <Spinner />}
      {results.type === "Error" && <InfoText>{results.message}</InfoText>}
      {(results.type === "Fetched" || results.type === "FetchingMore") &&
        results.value.total === 0 && <InfoText>No results</InfoText>}
      {(results.type === "Fetched" || results.type === "FetchingMore") && (
        <ResultsWrapper>
          {results.value.items.map((v) => (
            <React.Fragment key={v.book.line}>
              <SearchResult
                result={v}
                searchText={results.value.search.phrase}
                onClick={() => state.goToRead(v.book)}
              />
            </React.Fragment>
          ))}
          {results.value.total !== results.value.items.length && (
            <Button btnType="primary" type="button" onClick={state.showMore}>
              {results.type === "FetchingMore"
                ? "Loading"
                : `Show ${results.value.total - 20} more results`}
            </Button>
          )}
        </ResultsWrapper>
      )}
    </>
  )
}

export default SearchResults

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
`
