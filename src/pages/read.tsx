import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { Text } from "../components/SearchResult"
import { useSearchState } from "../hooks/useSearchState"

const Read: NextPage = () => {
  const state = useSearchState()

  const [results, setResults] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const { book, page } = router.query || {}
    if (book && page) {
      fetch(`/api/read?book=${book}&page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.book, router.query.page])

  const goToPage = (move: "next" | "previous") => () => {
    const { page } = state.query
    const pageNumber = typeof page === "string" ? parseInt(page) : 0
    router.push({
      pathname: "/read",
      query: { book: router.query.book, page: move === "next" ? pageNumber + 1 : pageNumber - 1 },
    })
  }

  return (
    <div>
      <Header {...state} />
      <Text rawText={results.join("")} />
      <div>
        <Button btnType="secondary" onClick={goToPage("previous")}>
          Previous
        </Button>
        <Button btnType="secondary" onClick={goToPage("next")}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default Read
