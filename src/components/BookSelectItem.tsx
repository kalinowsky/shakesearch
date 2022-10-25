import { title } from "process"
import styled from "styled-components"
import { F0 } from "../types"

export const BookSelectItem: React.FC<{ selected: boolean; onClick: F0; title: string }> = (
  props
) => (
  <BookSelectItemWrapper key={props.title} onClick={props.onClick} selected={props.selected}>
    {props.selected ? (
      <CheckWrapper>
        <Check />
      </CheckWrapper>
    ) : (
      <MarkLetter>+</MarkLetter>
    )}
    {props.title}
  </BookSelectItemWrapper>
)

const BookSelectItemWrapper = styled.div<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? props.theme.colors.primary : props.theme.colors.black)};
  cursor: pointer;
  margin: 4px;
  padding: 16px;
  border-radius: 4px;
  padding-left: 70px;
  position: relative;
  font-weight: ${(props) => (props.selected ? "500" : "400")};
`

const CheckWrapper = styled.div`
  position: absolute;
  left: 0px;
  height: 50px;
  width: 44px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Check = styled.div`
  display: inline-block;
  transform: rotate(45deg);
  height: 15px;
  width: 7px;
  margin-left: 60%;
  border-bottom: 5px solid ${(props) => props.theme.colors.primary};
  border-right: 5px solid ${(props) => props.theme.colors.primary};
`

const MarkLetter = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 41px;
  color: black;
  left: 8px;
`
