import styled from "styled-components"
import { InfoText } from "../components/InfoText"
import { Text } from "../components/Text"
import { Spinner } from "../components/Spinner"
import { useRead } from "../hooks/useRead"
import { getPageInformation } from "../services/contents"
import { PageProps } from "../types"
import { BookNavigation } from "../components/BookNavigation"

const Read: PageProps = () => {
  const { results, ...props } = useRead()
  return (
    <>
      <BookNavigation results={results} {...props} />
      {results.type === "Fetching" && <Spinner />}
      {results.type === "Error" && <InfoText>{results.message}</InfoText>}
      {(results.type === "Fetched" || results.type === "FetchingMore") && (
        <Wrapper>
          <Page>
            <Text rawText={results.value.content.join("")} />
            <Text rawText={getPageInformation(results.value.book)} center />
          </Page>
        </Wrapper>
      )}
    </>
  )
}

export default Read

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 82px 0;
`

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
