import React, { useState } from "react"
import styled from "styled-components"
import { contents, FullBookName, ShortBookName } from "../services/contents"
import { BookSelectItem } from "./BookSelectItem"
import { Button } from "./Button"

type BookSelectProps = {
  selectedBooks: ShortBookName[]
  visible: boolean
  onClose: (v: ShortBookName[]) => void
}

export const BookSelectModal: React.FC<BookSelectProps> = (props) => {
  const [selectedBooks, setSelectedBooks] = useState<ShortBookName[]>(props.selectedBooks)
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
        <Header>Select the books you wish to search in</Header>
        <Results>
          {Object.keys(contents).map((k) => {
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
  height: 600px;
  overflow-y: hidden;
  background: #e3dfe3;
  z-index: 200;
  border: 1px solid ${(props) => props.theme.colors.grey};
  border-radius: 4px;
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
  align-items: center;
  background-color: #dedede;
`

const Results = styled.div`
  overflow-y: scroll;
  height: 500px;
  @media only screen and (max-width: 640px) {
    height: 100%;
  }
`

const Header = styled.div`
  position: sticky;
  top: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dedede;
`
