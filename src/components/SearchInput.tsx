import Image from "next/image"
import styled from "styled-components"
import { HeaderStateProps } from "../hooks/useSearchState"
import { ShortBookName } from "../services/contents"

export const SearchInput: React.FC<HeaderStateProps> = (props) => (
  <div>
    <FormWrapper onSubmit={props.onSubmit}>
      <SearchButton type="submit">
        <Image src="/search.svg" height={28} width={28} alt="magnifying glass" />
      </SearchButton>
      <Input
        placeholder="Search phrase..."
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      />
      <BooksButton onClick={() => props.setBookSelectModalVisible(true)}>
        <BooksButtonText>{getSelectBooksButtonName(props.selectedBooks)}</BooksButtonText>
        <Image src="/books.png" height={36} width={36} alt="books" />
      </BooksButton>
    </FormWrapper>
    {props.inputValidation.type === "Error" && props.submitted && (
      <Error>{props.inputValidation.message}</Error>
    )}
  </div>
)

const getSelectBooksButtonName = (selectedBooks: ShortBookName[]): string =>
  selectedBooks.length > 0 ? `${selectedBooks.length} books` : "Select books"

const FormWrapper = styled.form`
  width: 500px;
  position: relative;
  @media only screen and (max-width: 640px) {
    width: 100%;
    margin: 0 16px;
  }
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  outline: none;
  border: 0;
  border-radius: 4px;
  padding-left: 56px;
  padding-right: 150px;

  box-sizing: border-box;
  font-size: 18px;
  border: 1px solid #e6e6e6;

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`

const SearchButton = styled.button`
  position: absolute;
  height: 48px;
  top: 1px;
  left: 8px;
  outline: none;
  border: 0;
  background-color: white;
  cursor: pointer;
  border-radius: 0px 4px 4px 0;
  box-sizing: border-box;
`

const BooksButton = styled.button`
  position: absolute;
  height: 48px;
  width: 150px;
  right: 8px;
  top: 1px;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  border: none;
  font-size: 17px;
  font-weight: 500;
  color: #afafaf;
  background-color: white;
`

const BooksButtonText = styled.div`
  margin-right: 10px;
  text-align: end;
  width: 100%;
`

const Error = styled.div`
  color: ${(props) => props.theme.colors.danger};
  font-size: 14px;
  position: absolute;
  margin-top: 4px;
`
