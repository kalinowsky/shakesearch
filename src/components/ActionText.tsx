import styled from "styled-components"

export const ActionText = styled.button`
  cursor: pointer;
  color: red;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
  border: none;
  background: none;
  font-size: 16px;
  font-weight: 500;
  font-family: roboto;

  &:hover {
    color: #9666f8;
  }

  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`
