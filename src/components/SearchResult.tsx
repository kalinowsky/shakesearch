import styled from "styled-components"
import { getFullBookNameByShortName, getPageInformation } from "../services/contents"
import { SearchResultItem } from "../services/validation"
import { HighlightedText } from "./HighlitedText"
import { Text } from "./Text"

type SearchResultProps = {
  result: SearchResultItem
  searchText: string
  onClick: () => void
}

export const SearchResult: React.FC<SearchResultProps> = (props) => {
  return (
    <SearchResultWrapper onClick={props.onClick}>
      <Title>{getFullBookNameByShortName(props.result.book.shortName)}</Title>
      <Page>{`Page ${getPageInformation(props.result.book)}`}</Page>
      <Text rawText={props.result.context.previous} />
      <HighlightedText text={props.result.value} highlight={props.searchText}></HighlightedText>
      <Text rawText={props.result.context.next} />
    </SearchResultWrapper>
  )
}

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-family: "Lora";
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
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }

  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`
