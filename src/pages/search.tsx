import React from "react"
import styled from "styled-components"
import { Button } from "../components/Button"
import { SearchResult } from "../components/SearchResult"
import { Spinnner } from "../components/Spinner"
import { PageProps } from "../types"

const SearchResults: PageProps = (props) => {
  const { searchResults: results, state } = props
  return (
    <>
      {results.type === "Fetching" && (
        <SpinnerWrapper>
          <Spinnner />
        </SpinnerWrapper>
      )}
      {results.type === "Error" && results.message}
      {(results.type === "Fetched" || results.type === "FetchingMore") && (
        <ResultsWrapper>
          {results.value.items.map((v) => (
            <React.Fragment key={v.book.line}>
              <SearchResult
                result={v}
                searchText={state.searchText}
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
