import type { NextPage } from "next"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { Header } from "../components/Header"

type Result = {
  item: {
    value: string
    index: number
    isTitle: boolean
    title: string
    context: any
  }
  refIndex: number
  score: number
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
  }, [router.query.q])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.replace({ pathname: "/", query: { q: searchText } })
  }
  return (
    <div>
      <Header
        fullHeight={!(router.query.q || "").length || results.length === 0}
        onSubmit={onSubmit}
        value={searchText}
        setValue={setSearchText}
      />
    </div>
  )
}

export default Search
