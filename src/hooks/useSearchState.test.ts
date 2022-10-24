import { act } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import mockRouter from "next-router-mock"
import { useSearchState } from "./useSearchState"

jest.mock("next/router", () => require("next-router-mock"))

beforeEach(() => {})

describe("useSearchState", () => {
  test("inits with proper state", async () => {
    mockRouter.setCurrentUrl("/")
    const { result } = renderHook(() => useSearchState())
    expect(result.current.query).toEqual({})
    expect(result.current.searchText).toEqual("")
    expect(result.current.selectedBooks).toEqual([])
    expect(result.current.bookSelectModalVisible).toEqual(false)
    expect(result.current.submitted).toEqual(false)
  })

  test("inits with proper state if phrase passed", async () => {
    mockRouter.setCurrentUrl("/search?q=hamlet")
    const { result } = renderHook(() => useSearchState())
    expect(result.current.query).toEqual({ q: "hamlet" })
    expect(result.current.searchText).toEqual("hamlet")
    expect(result.current.selectedBooks).toEqual([])
    expect(result.current.bookSelectModalVisible).toEqual(false)
    expect(result.current.submitted).toEqual(false)
  })

  test("inits with proper state if phrase and book are passed", async () => {
    mockRouter.setCurrentUrl("/search?q=hamlet&books=HAM")
    const { result } = renderHook(() => useSearchState())
    expect(result.current.query).toEqual({ q: "hamlet", books: "HAM" })
    expect(result.current.searchText).toEqual("hamlet")
    expect(result.current.selectedBooks).toEqual(["HAM"])
    expect(result.current.bookSelectModalVisible).toEqual(false)
    expect(result.current.submitted).toEqual(false)
  })

  test("inits with proper state if phrase and 2 books are passed", async () => {
    mockRouter.setCurrentUrl("/search?q=hamlet&books=HAM%2CCLEO")
    const { result } = renderHook(() => useSearchState())
    expect(result.current.query).toEqual({ q: "hamlet", books: "HAM,CLEO" })
    expect(result.current.searchText).toEqual("hamlet")
    expect(result.current.selectedBooks).toEqual(["HAM", "CLEO"])
    expect(result.current.bookSelectModalVisible).toEqual(false)
    expect(result.current.submitted).toEqual(false)
  })

  test("fails when try too submit to short value", async () => {
    mockRouter.setCurrentUrl("/search")
    const { result } = renderHook(() => useSearchState())
    expect(result.current.searchText).toEqual("")
    expect(result.current.submitted).toEqual(false)
    act(() => {
      result.current.setSearchText("H")
      result.current.onSubmit({ preventDefault: () => {} } as any)
    })
    expect(result.current.submitted).toEqual(true)
    expect(result.current.inputValidation.type).toEqual("Error")
  })

  test("change route when submit correct value", async () => {
    mockRouter.setCurrentUrl("/search")
    const { result } = renderHook(() => useSearchState())
    expect(result.current.searchText).toEqual("")
    expect(result.current.submitted).toEqual(false)
    act(() => {
      result.current.setSearchText("Hamlet")
      result.current.onSubmit({ preventDefault: () => {} } as any)
    })
    expect(result.current.submitted).toEqual(true)
    expect(result.current.inputValidation.type).toEqual("Ok")
  })
})
