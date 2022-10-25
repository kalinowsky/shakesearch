import { useRouter } from "next/router"
import styled from "styled-components"
import Image from "next/image"
import { HeaderStateProps } from "../hooks/useSearchState"
import { getFullBookNameByShortName, ShortBookName } from "../services/contents"
import { Button } from "./Button"
import { Input } from "./Input"

export const Header: React.FC<HeaderStateProps & { fullHeight?: boolean }> = (props) => {
  const router = useRouter()
  return (
    <>
      <HeaderWrapper {...props}>
        <ImageWrapper onClick={() => (router.pathname === "/" ? router.back() : router.push("/"))}>
          <Image src="/book.png" alt="me" width="50" height="50" />
        </ImageWrapper>
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
              width="220px"
            >
              {getSelectBooksButtonName(props.selectedBooks)}
            </Button>
            <Button btnType="primary" type="submit" width="220px">
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
    : "Select books (Optional)"

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
  input,
  button {
    margin-left: 24px;
  }

  @media only screen and (max-width: 640px) {
    input,
    button {
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
    display: none;
  }
`
