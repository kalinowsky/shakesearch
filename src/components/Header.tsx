import { FormEventHandler } from "react"
import styled from "styled-components"
import { Button } from "./Button"

type HeaderProps = {
  fullHeight: boolean
  value: string
  setValue: (v: string) => void
  onSubmit: FormEventHandler<HTMLFormElement>
}
export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <HeaderWrapper {...props}>
        <Form onSubmit={props.onSubmit}>
          <Input
            placeholder="Search phrase..."
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          />
          <ButtonWrapper>
            <Button btnType="secondary" type="button">
              Select books
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

const HeaderWrapper = styled.header<{ fullHeight?: boolean }>`
  width: 100%;
  height: ${(props) => (props.fullHeight ? "100px" : "100px")};
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dadada;
`

const Input = styled.input`
  width: 300px;
  height: 40px;
  outline: none;
  border: 0;
  border-radius: 4px;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 18px;
  border: 1px solid #e6e6e6;
`

const Form = styled.form`
  * {
    margin-left: 24px;
  }
`

const ButtonWrapper = styled.div`
  display: inline-flex;
`
