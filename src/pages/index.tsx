import styled from "styled-components"
import { SearchResult } from "../components/SearchResult"
import { PageProps } from "../types"

const SearchResults: PageProps = (props) => {
  const { searchResults: results, state } = props
  return (
    <div>
      {results.type === "Fetching" && <div>loading</div>}
      {results.type === "Error" && results.message}
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
    </div>
  )
}

export default SearchResults

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
