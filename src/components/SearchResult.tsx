import styled from "styled-components"
import { getFullBookNameByShortName } from "../services/contents"
import { SearchResultItem } from "../services/validation"
import { HighlightedText } from "./HighlitedText"

type SearchResultProps = {
  result: SearchResultItem
  searchText: string
  onClick: () => void
}

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  return (
    <SearchResultWrapper onClick={props.onClick}>
      <Title>{getFullBookNameByShortName(props.result.book.shortName)}</Title>
      <Page>{`Page ${props.result.book.page}/${props.result.book.size}`}</Page>
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

const Page = styled.h4`
  margin: 0;
  font-size: 14px;
  color: #a7a7a7;
  font-weight: 400;
  margin: 8px 0;
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
