import type { NextPage } from "next"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import styled from "styled-components"
import { Header } from "../components/Header"
import { SearchResult } from "../components/SearchResult"
import { ShortName } from "../services/contents"

export type Result = {
  book: ShortName
  results: {
    value: string
    index: number
    isTitle: boolean
    title: string
    refIndex: number
    item: string
  }
  context: { next: string; previous: string; page: number }
}

const Search: NextPage = () => {
  const [results, setResults] = useState<Result[]>([])
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const { q } = router.query || {}
    if (typeof q === "string" && q.length > 3) {
      setSearchText(q)
      setLoading(true)
      fetch(`/api/search?phrase=${q}`)
        .then((response) => response.json())
        .then((data) => {
          setResults(data)
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push({ pathname: "/", query: { q: searchText } })
  }

  return (
    <div>
      <Header
        fullHeight={!(router.query.q || "").length || results.length === 0}
        onSubmit={onSubmit}
        value={searchText}
        setValue={setSearchText}
      />
      <ResultsWrapper>
        {results.map((v) => (
          <SearchResult
            key={v.results.refIndex}
            result={v}
            searchText={searchText}
            onClick={(v) =>
              router.push({ pathname: "/read", query: { book: v.book, page: v.context.page } })
            }
          />
        ))}
      </ResultsWrapper>
    </div>
  )
}

export default Search

const ResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
