import styled from "styled-components"
import { Result } from "../pages"
import { getFullBookNameByShortName } from "../services/contents"
import { SearchResult as SearchResultType } from "../services/validation"
import { HighlightedText } from "./HighlitedText"

type SearchResultProps = {
  result: SearchResultType
  searchText: string
  onClick: (v: SearchResultType) => void
}
export const SearchResult: React.FC<SearchResultProps> = (props) => {
  return (
    <SearchResultWrapper onClick={() => props.onClick(props.result)}>
      <Title>{getFullBookNameByShortName(props.result.book.shortName)}</Title>
      <Text rawText={props.result.context.previous} />
      <HighlightedText text={props.result.value} highlight={props.searchText}></HighlightedText>
      <Text rawText={props.result.context.next} />
    </SearchResultWrapper>
  )
}

export const Text: React.FC<{ rawText: string }> = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: props.rawText.replace(new RegExp("\r", "g"), "<br />"),
      }}
    />
  )
}

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
`

const SearchResultWrapper = styled.article`
  width: 480px;
  background-color: white;
  border-radius: 4px;
  padding: 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
  cursor: pointer;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`
