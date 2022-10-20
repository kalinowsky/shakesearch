import React, { useState } from "react"
import styled from "styled-components"
import { contents, FullBookName, ShortBookName } from "../services/contents"
import { Button } from "./Button"

type BookSelectProps = {
  selectedBooks: ShortBookName[]
  visible: boolean
  onClose: (v: ShortBookName[]) => void
}

export const BookSelect: React.FC<BookSelectProps> = (props) => {
  const [selectedBooks, setSelectedBooks] = useState<ShortBookName[]>(props.selectedBooks)
  const toggleBook = (v: ShortBookName) => () => {
    if (selectedBooks.includes(v)) setSelectedBooks(selectedBooks.filter((book) => book !== v))
    else {
      setSelectedBooks((books) => [...books, v])
    }
  }
  return (
    <Overlay
      style={{ visibility: props.visible ? "visible" : "hidden" }}
      onClick={() => props.onClose(props.selectedBooks)}
    >
      <Content onClick={(e) => e.stopPropagation()}>
        <Header>Select the books you wish to search in</Header>
        <Results>
          {Object.keys(contents).map((k) => {
            const shortName = contents[k as FullBookName].short
            return (
              <BookItemElement
                key={k}
                onClick={toggleBook(shortName)}
                selected={selectedBooks.includes(shortName)}
              >
                {k}
              </BookItemElement>
            )
          })}
        </Results>
        <Footer>
          <Button btnType="primary" onClick={() => props.onClose(selectedBooks)}>
            Select and close
          </Button>
        </Footer>
      </Content>
    </Overlay>
  )
}

const BookItemElement = styled.div<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? props.theme.colors.primary : "black")};
  cursor: pointer;
  margin: 4px;
`

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #d6d6d670;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
`
const Content = styled.div`
  width: 600px;
  height: 600px;
  overflow-y: scroll;
  background: #e3dfe3;
  z-index: 10;
  @media only screen and (max-width: 640px) {
    width: 100%;
    height: 100%;
  }
`

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #dedede;
`

const Results = styled.div`
  padding: 16px 0;
`

const Header = styled.div`
  position: sticky;
  top: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #dedede;
`
