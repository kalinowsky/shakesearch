import { renderHook } from "@testing-library/react-hooks"
import { waitFor } from "@testing-library/react"
import { useSearch } from "./useSearch"
import mockRouter from "next-router-mock"
import { makeSearchResultFixture } from "../services/fixtures"

jest.mock("next/router", () => require("next-router-mock"))

const fetchMock = jest.fn((v) =>
  Promise.resolve({
    json: () => {
      if (v === "/api/search?phrase=hamlet") return Promise.resolve(makeSearchResultFixture())
      if (v === "/api/search?phrase=hamlet&all=true")
        return Promise.resolve(makeSearchResultFixture())
    },
  })
)

;(global.fetch as any) = fetchMock

beforeEach(() => {
  fetchMock.mockClear()
})

describe("useSearch", () => {
  test("searching flow works if passed correct data", async () => {
    mockRouter.setCurrentUrl("/search?q=hamlet")
    const { result } = renderHook(() => useSearch())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({ type: "Fetching" })
    await waitFor(() => expect(result.all.length).toEqual(3))
    expect((result.all[2] as any).results).toEqual({
      type: "Fetched",
      value: makeSearchResultFixture(),
    })
  })

  test("searching flow does not work if passed too short phrase", async () => {
    mockRouter.setCurrentUrl("/search?q=ha")
    const { result } = renderHook(() => useSearch())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({
      type: "Error",
      message: "Too short name",
    })
  })

  test("searching flow works if passed invalid books", async () => {
    mockRouter.setCurrentUrl("/search?q=hamlet&books=ASDF")
    const { result } = renderHook(() => useSearch())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({ type: "Fetching" })

    await waitFor(() => expect(result.all.length).toEqual(3))
    expect((result.all[2] as any).results).toEqual({
      type: "Fetched",
      value: makeSearchResultFixture(),
    })
  })

  test("fetching more results works if passed correct data", async () => {
    mockRouter.setCurrentUrl("/search?q=hamlet")
    const { result } = renderHook(() => useSearch())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({ type: "Fetching" })
    await waitFor(() => expect(result.all.length).toEqual(3))
    expect((result.all[2] as any).results).toEqual({
      type: "Fetched",
      value: makeSearchResultFixture(),
    })
    mockRouter.replace("/search?q=hamlet&all=True")
    await waitFor(() => expect(result.all.length).toEqual(6))
    expect((result.all[3] as any).results).toEqual({
      type: "Fetched",
      value: makeSearchResultFixture(),
    })
    expect((result.all[4] as any).results).toEqual({
      type: "FetchingMore",
      value: makeSearchResultFixture(),
    })
    expect((result.all[5] as any).results).toEqual({
      type: "Fetched",
      value: makeSearchResultFixture(),
    })
  })
})
