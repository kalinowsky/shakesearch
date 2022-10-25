import React, { useState } from "react"
import styled from "styled-components"
import { contents, decalredShortNames, FullBookName, ShortBookName } from "../services/contents"
import { ActionText } from "./ActionText"
import { BookSelectItem } from "./BookSelectItem"
import { Button } from "./Button"
import { Input } from "./Input"

type BookSelectProps = {
  selectedBooks: ShortBookName[]
  visible: boolean
  onClose: (v: ShortBookName[]) => void
}

export const BookSelectModal: React.FC<BookSelectProps> = (props) => {
  const [selectedBooks, setSelectedBooks] = useState<ShortBookName[]>(props.selectedBooks)
  const [filter, setFilter] = useState("")
  const toggleBook = (v: ShortBookName) => () => {
    if (selectedBooks.includes(v)) setSelectedBooks(selectedBooks.filter((book) => book !== v))
    else {
      setSelectedBooks((books) => [...books, v])
    }
  }
  const buttonText = selectedBooks.length
    ? `Select ${selectedBooks.length} and close`
    : "Select all and close"

  return (
    <Overlay
      style={{ visibility: props.visible ? "visible" : "hidden" }}
      onClick={() => props.onClose(props.selectedBooks)}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>
          <TextAsdf>If no books are selected search will use all books by default</TextAsdf>
          <Helpers>
            <Input value={filter} setValue={setFilter} placeholder="Book name..." />
            <ActionsWrapper>
              <ActionText onClick={() => setSelectedBooks(decalredShortNames as any)}>
                Select All
              </ActionText>
              <ActionText onClick={() => setSelectedBooks([])}>Deselect All</ActionText>
            </ActionsWrapper>
          </Helpers>
        </Header>
        <ResultsWrapper>
          <Results>
            {Object.keys(contents)
              .filter((v) => v.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
              .map((k) => {
                const shortName = contents[k as FullBookName].short
                return (
                  <BookSelectItem
                    title={k}
                    onClick={toggleBook(shortName)}
                    selected={selectedBooks.includes(shortName)}
                    key={k}
                  />
                )
              })}
          </Results>
        </ResultsWrapper>
        <Footer>
          <Button btnType="primary" onClick={() => props.onClose(selectedBooks)}>
            {buttonText}
          </Button>
        </Footer>
      </Content>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #44444470;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  z-index: 100;
`
const Content = styled.div`
  width: 600px;
  height: 700px;
  overflow-y: hidden;
  background: white;
  z-index: 200;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
  position: relative;

  @media only screen and (max-width: 640px) {
    width: 100%;
    height: 100%;
  }
`

const Footer = styled.div`
  position: absolute;
  height: 80px;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white;
  border-top: 1px solid ${(props) => props.theme.colors.grey};
  padding: 16px;
  box-sizing: border-box;

  @media only screen and (max-width: 640px) {
    justify-content: center;
  }
`

const Results = styled.div`
  overflow-y: scroll;
  height: 490px;
  @media only screen and (max-width: 640px) {
    height: 100%;
  }
`

const ResultsWrapper = styled.div`
  @media only screen and (max-width: 640px) {
    height: calc(100% - 250px);
  }
`

const Header = styled.div`
  position: sticky;
  top: 0;
  height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey};
  padding: 16px;
  box-sizing: border-box;

  @media only screen and (max-width: 640px) {
    height: 170px;
  }
`

const Helpers = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  margin-bottom: 8px;

  @media only screen and (max-width: 640px) {
    flex-direction: column;
    height: 60px;
    flex-direction: column;
    height: 70px;
    justify-content: space-between;
    margin-bottom: 0px;
    input {
      width: 100%;
    }
  }
`

const ActionsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`

const TextAsdf = styled.div`
  border-radius: 4px;
  padding: 8px;
  background-color: #ececec;
  color: #676767;
`
