import styled from "styled-components"

export const InfoText = styled.div`
  height: 100vh;
  width: 100%;
  display: text;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 30px;
  position: absolute;
  top: 0;
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey};
`
