import "../../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { SearchWrapper } from "../components/SearchWrapper"
import { useSearch } from "../hooks/useSearch"
import { Header } from "../components/Header"
import { useSearchState } from "../hooks/useSearchState"
import { BookSelectModal } from "../components/BookSelectModal"

export const theme = {
  name: "light-theme",
  colors: {
    background: "#efefef",
    primary: "#5e2dc2",
    secondary: "#ffffff",
  },
}

function App({ Component, pageProps, router }: AppProps) {
  const { result: results } = useSearch()
  const state = useSearchState()
  return (
    <>
      <ThemeProvider theme={theme}>
        <Header {...state} fullHeight={router.pathname === "/"} />
        <SearchWrapper>
          <Component {...pageProps} searchResults={results} state={state} />
        </SearchWrapper>
        {state.bookSelectVisible && (
          <BookSelectModal
            {...state}
            visible={state.bookSelectVisible}
            onClose={(books) => {
              state.setSelectedBooks(books)
              state.setBookSelectVisible(false)
            }}
          />
        )}
      </ThemeProvider>
    </>
  )
}

export default App
