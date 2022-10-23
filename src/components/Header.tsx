import styled from "styled-components"
import Image from "next/image"
import { HeaderStateProps } from "../hooks/useSearchState"
import { getFullBookNameByShortName, ShortBookName } from "../services/contents"
import { Button } from "./Button"
import Link from "next/link"
import { Input } from "./Input"

export const Header: React.FC<HeaderStateProps & { fullHeight?: boolean }> = (props) => {
  return (
    <>
      <HeaderWrapper {...props}>
        <Link href={"/"}>
          <ImageWrapper>
            <Image src="/shakespeare.svg" alt="me" width="64" height="64" />
          </ImageWrapper>
        </Link>
        <Form onSubmit={props.onSubmit}>
          <Input
            placeholder="Search phrase..."
            value={props.searchText}
            setValue={props.setSearchText}
            error={
              props.submitted && props.inputValidation.type === "Error"
                ? props.inputValidation.message
                : ""
            }
          />

          <ButtonWrapper>
            <Button
              btnType="secondary"
              type="button"
              onClick={() => props.setBookSelectModalVisible(true)}
              width="300px"
            >
              {getSelectBooksButtonName(props.selectedBooks)}
            </Button>
            <Button btnType="primary" type="submit">
              Search
            </Button>
          </ButtonWrapper>
        </Form>
      </HeaderWrapper>
    </>
  )
}

const getSelectBooksButtonName = (selectedBooks: ShortBookName[]): string =>
  selectedBooks.length === 1
    ? getFullBookNameByShortName(selectedBooks[0])
    : selectedBooks.length > 1
    ? `Selected ${selectedBooks.length} books`
    : "Select books"

const HeaderWrapper = styled.header<{ fullHeight?: boolean }>`
  width: 100%;
  height: ${(props) => (props.fullHeight ? "100vh" : "100px")};
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dadada;
  transition: all 0.5s ease;
  position: fixed;
  z-index: 100;

  @media only screen and (max-width: 640px) {
    height: ${(props) => (props.fullHeight ? "100vh" : "160px")};
  }
`

const Form = styled.form`
  * {
    margin-left: 24px;
  }

  @media only screen and (max-width: 640px) {
    * {
      margin-left: 0px;
      margin-bottom: 6px;
    }
  }
`

const ButtonWrapper = styled.div`
  display: inline-flex;

  @media only screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`
const ImageWrapper = styled.div`
  position: absolute;
  left: 24px;
  top: 24px;
  cursor: pointer;

  @media only screen and (max-width: 640px) {
    left: 6px;
    top: 6px;
    width: 36px;
  }
`
