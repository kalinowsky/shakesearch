import "../../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { SearchWrapper } from "../components/SearchWrapper"

export const theme = {
  name: "light-theme",
  colors: {
    background: "#efefef",
    primary: "#5e2dc2",
    secondary: "#ffffff",
  },
}

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SearchWrapper>
        <Component {...pageProps} />
      </SearchWrapper>
    </ThemeProvider>
  )
}

export default App
