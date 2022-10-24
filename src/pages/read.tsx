import styled from "styled-components"
import { Chevron } from "../components/Chevron"
import { InfoText } from "../components/InfoText"
import { Text } from "../components/SearchResult"
import { Spinner } from "../components/Spinner"
import { useRead } from "../hooks/useRead"
import { getFullBookNameByShortName, getPageInformation } from "../services/contents"
import { ReadResult } from "../services/validation"
import { PageProps } from "../types"

const Read: PageProps = () => {
  const { results, goToPage, canGoToPage } = useRead()
  return (
    <div>
      {results.type === "Fetching" && <Spinner />}
      {results.type === "Error" && <InfoText>{results.message}</InfoText>}
      {(results.type === "Fetched" || results.type === "FetchingMore") && (
        <>
          <BookDetails book={results.value.book} />
          <Wrapper>
            <Chevron
              direction="left"
              disabled={canGoToPage("previous")}
              onClick={goToPage("previous")}
            />
            <Text rawText={results.value.content.join("")} />
            <Chevron direction="right" disabled={canGoToPage("next")} onClick={goToPage("next")} />
          </Wrapper>
        </>
      )}
    </div>
  )
}

export default Read

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: stretch;
  height: 600px;
`

const BookDetails: React.FC<{ book: ReadResult["book"] }> = (props) => {
  return (
    <BookDetailsWrapper>
      <Width>
        <h3>{getFullBookNameByShortName(props.book.shortName)}</h3>
        <h4>{getPageInformation(props.book)}</h4>
      </Width>
    </BookDetailsWrapper>
  )
}

const BookDetailsWrapper = styled.div`
  display: flex;
  justify-content: center; ;
`

const Width = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
`
