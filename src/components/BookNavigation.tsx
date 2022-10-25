import styled from "styled-components"
import { UseReadResult } from "../hooks/useRead"
import { getFullBookNameByShortName } from "../services/contents"
import { ActionText } from "./ActionText"
import { Text } from "./Text"

export const BookNavigation: React.FC<UseReadResult> = (props) => {
  return (
    <BookNav>
      <BookDetailsInnerWrapper>
        <ActionText onClick={props.goToPage("previous")} disabled={props.canGoToPage("previous")}>
          Previous
        </ActionText>
        {(props.results.type === "Fetched" || props.results.type === "FetchingMore") && (
          <Width>
            <Text rawText={getFullBookNameByShortName(props.results.value.book.shortName)} title />
          </Width>
        )}
        <ActionText onClick={props.goToPage("next")} disabled={props.canGoToPage("next")}>
          Next
        </ActionText>
      </BookDetailsInnerWrapper>
    </BookNav>
  )
}

const BookDetailsInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
`

const Width = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
`

const BookNav = styled.nav`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #dadada;
  position: fixed;
  top: 100px;
  background: white;
`
