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
            onClose={(books) => {
              state.setSelectedBooks(books)
              state.setBookSelectModalVisible(false)
            }}
          />
        )}
      </ThemeProvider>
    </>
  )
}

export default App
