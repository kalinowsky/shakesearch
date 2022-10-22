import React from "react"
import styled from "styled-components"
import { Button } from "../components/Button"
import { SearchResult } from "../components/SearchResult"
import { Spinnner } from "../components/Spinner"
import { useSearch } from "../hooks/useSearch"
import { PageProps } from "../types"

const SearchResults: PageProps = (props) => {
  const { result } = useSearch()
  const { state } = props
  return (
    <>
      {result.type === "Fetching" && (
        <SpinnerWrapper>
          <Spinnner />
        </SpinnerWrapper>
      )}
      {result.type === "Error" && result.message}
      {(result.type === "Fetched" || result.type === "FetchingMore") && (
        <ResultsWrapper>
          {result.value.items.map((v) => (
            <React.Fragment key={v.book.line}>
              <SearchResult
                result={v}
                searchText={state.searchText}
                onClick={() => state.goToRead(v.book)}
              />
            </React.Fragment>
          ))}
          {result.value.total !== result.value.items.length && (
            <Button btnType="primary" type="button" onClick={state.showMore}>
              {result.type === "FetchingMore"
                ? "Loading"
                : `Show ${result.value.total - 20} more results`}
            </Button>
          )}
        </ResultsWrapper>
      )}
    </>
  )
}

export default SearchResults

const SpinnerWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #efefef;
`

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
