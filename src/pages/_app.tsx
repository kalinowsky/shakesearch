import "../../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { SearchWrapper } from "../components/SearchWrapper"
import { Header } from "../components/Header"
import { useSearchState } from "../hooks/useSearchState"
import { BookSelectModal } from "../components/BookSelectModal"

export const theme = {
  name: "light-theme",
  colors: {
    background: "#efefef",
    primary: "#5e2dc2",
    secondary: "#ffffff",
    black: "#000000",
    white: "#ffffff",
    grey: "#b0b0b0",
    danger: "#dd4141",
  },
}

function App({ Component, pageProps, router }: AppProps) {
  const state = useSearchState()
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header {...state} fullHeight={router.pathname === "/"} />
        <SearchWrapper>
          <Component {...pageProps} state={state} />
        </SearchWrapper>
        {state.bookSelectModalVisible && (
          <BookSelectModal
            {...state}
            visible={state.bookSelectModalVisible}
            onClose={state.applySelectedBooks}
          />
        )}
      </ThemeProvider>
    </>
  )
}

export default App
