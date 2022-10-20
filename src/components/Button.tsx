import styled from "styled-components"

export const Button = styled.button<{ btnType: string; width?: string }>`
  background-color: ${(props: any) =>
    props.btnType === "primary" ? props.theme.colors.primary : props.theme.colors.secondary};
  color: ${(props: any) =>
    props.btnType === "primary" ? props.theme.colors.secondary : props.theme.colors.primary};
  border: 1px solid ${(props) => (props.btnType === "primary" ? "#9273cb" : "#e6e6e6")};
  min-width: 100px;
  width: ${(props) => props.width || "auto"};
  height: 40px;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 0 16px;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
`
