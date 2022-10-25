import { InputHTMLAttributes } from "react"
import styled from "styled-components"
import { F1 } from "../types"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  value: string
  setValue: F1<string>
  error?: string | undefined
}
export const Input: React.FC<InputProps> = (props) => {
  const { value, setValue, error } = props
  return (
    <InputWrapper>
      <InputElement {...props} onChange={(e) => setValue(e.target.value)} value={value} />
      {props.error && <Error>{error}</Error>}
    </InputWrapper>
  )
}

const InputElement = styled.input`
  width: 300px;
  height: 40px;
  outline: none;
  border-radius: 4px;
  padding: 0 16px;
  box-sizing: border-box;
  font-size: 18px;
  border: 1px solid #e6e6e6;

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`

const InputWrapper = styled.div`
  height: 40px;
  display: inline-grid;

  @media only screen and (max-width: 960px) {
    width: 100%;
  }
`

const Error = styled.p`
  color: ${(props) => props.theme.colors.danger};
  margin-top: 0;
  margin-bottom: 0;
  font-size: 14px;
`
