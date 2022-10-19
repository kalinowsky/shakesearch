import type { NextPage } from "next"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { Text } from "../components/SearchResult"

const Read: NextPage = () => {
  const [results, setResults] = useState<string[]>([])
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const { book, page } = router.query || {}
    if (book && page) {
      setLoading(true)
      fetch(`/api/read?book=${book}&page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data)
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.book, router.query.page])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.replace({ pathname: "/", query: { q: searchText } })
  }

  const goToPage = (page: number) =>
    router.push({ pathname: "/read", query: { book: router.query.book, page } })

  return (
    <div>
      <Header
        fullHeight={!(router.query.q || "").length || results.length === 0}
        onSubmit={onSubmit}
        value={searchText}
        setValue={setSearchText}
      />
      <Text rawText={results.join("")} />
      <div>
        <Button btnType="secondary" onClick={() => goToPage(parseInt(router.query.page) - 1)}>
          Previous
        </Button>
        <Button btnType="secondary" onClick={() => goToPage(parseInt(router.query.page) + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default Read
