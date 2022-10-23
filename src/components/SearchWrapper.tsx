import styled from "styled-components"

export const SearchWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 100vw;
  height: 100%;
  padding: 120px 0 60px;

  @media only screen and (max-width: 480px) {
    padding: 180px 0 60px;
  }
`
