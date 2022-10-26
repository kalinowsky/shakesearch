import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"
import { ShortBookName } from "../services/contents"
import { extractBooksFromQuery, minSearchLength, SearchResultItem } from "../services/validation"
import { Ok, Err } from "../types"

type State = {
  searchText: string
  bookSelectModalVisible: boolean
  inputValidation: Ok<string> | Err
  submitted: boolean
  selectedBooks: ShortBookName[]
}

const initialState: State = {
  searchText: "",
  bookSelectModalVisible: false,
  inputValidation: { type: "Ok", value: "" },
  submitted: false,
  selectedBooks: [],
}

export const useSearchState = () => {
  const router = useRouter()

  const [state, setState] = useState<State>(initialState)
  const setStateProperty =
    <T extends keyof State>(key: T) =>
    (value: State[T]) => {
      setState((state) => ({ ...state, [key]: value }))
    }

  const { query } = router
  useEffect(() => {
    if (state.searchText.length < 4)
      setStateProperty("inputValidation")({
        type: "Error",
        message: "Search require min 4 characters",
      })
    else
      setStateProperty("inputValidation")({
        type: "Ok",
        value: state.searchText,
      })
  }, [state.searchText])

  useEffect(() => {
    const { q, books } = query || {}
    const queryResult = minSearchLength.safeParse(q)
    setState((state) => ({
      ...state,
      searchText: queryResult.success ? queryResult.data : state.searchText,
      selectedBooks: books ? extractBooksFromQuery(books) : state.selectedBooks,
    }))
  }, [query.q, query.books])

  const onSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    if (state.inputValidation.type === "Ok") {
      router.push({
        pathname: "/search",
        query: { q: state.searchText, books: state.selectedBooks.join(",") },
      })
      setStateProperty("submitted")(false)
    } else setStateProperty("submitted")(true)
  }

  const showMore = (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.replace(
      {
        pathname: "/search",
        query: { q: state.searchText, books: state.selectedBooks.join(","), all: true },
      },
      undefined,
      { scroll: false }
    )
  }

  const goToRead = (book: SearchResultItem["book"]) =>
    router.push({
      pathname: "/read",
      query: { book: book.shortName, page: book.page },
    })

  const applySelectedBooks = (books: ShortBookName[]) => {
    router.push(
      {
        query: { q: state.searchText, books: books.join(",") },
      },
      undefined,
      { scroll: false }
    )
    setState((state) => ({
      ...state,
      bookSelectModalVisible: false,
      selectedBooks: books,
    }))
  }

  return {
    ...state,
    setSearchText: setStateProperty("searchText"),
    setBookSelectModalVisible: setStateProperty("bookSelectModalVisible"),
    setSelectedBooks: setStateProperty("selectedBooks"),
    applySelectedBooks,
    query,
    goToRead,
    onSubmit,
    showMore,
  }
}

export type HeaderStateProps = ReturnType<typeof useSearchState>
