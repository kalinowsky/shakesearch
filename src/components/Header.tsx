import { useRouter } from "next/router"
import styled from "styled-components"
import Image from "next/image"
import { HeaderStateProps } from "../hooks/useSearchState"
import { SearchInput } from "./SearchInput"

export const Header: React.FC<HeaderStateProps & { fullHeight?: boolean }> = (props) => {
  const router = useRouter()
  return (
    <>
      <HeaderWrapper {...props}>
        <ImageWrapper onClick={() => (router.pathname === "/" ? router.back() : router.push("/"))}>
          <Image src="/book.png" alt="me" width="50" height="50" />
        </ImageWrapper>
        <SearchInput {...props} />
      </HeaderWrapper>
    </>
  )
}

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
