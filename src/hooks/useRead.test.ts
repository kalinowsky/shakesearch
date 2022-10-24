import { renderHook } from "@testing-library/react-hooks"
import { waitFor } from "@testing-library/react"

import { useRead } from "./useRead"
import mockRouter from "next-router-mock"
import { makeReadBookResultFixture } from "../services/fixtures"

jest.mock("next/router", () => require("next-router-mock"))

const fetchMock = jest.fn((v) =>
  Promise.resolve({
    json: () => {
      if (v === "/api/read?book=HAM&page=0") return Promise.resolve(makeReadBookResultFixture())
      if (v === "/api/read?book=HAM&page=1234") return Promise.resolve({ error: "Off-book page" })
      if (v === "/api/read?book=HAMMY&page=123") return Promise.resolve({ error: "Invalid book" })
    },
  })
)

;(global.fetch as any) = fetchMock

beforeEach(() => {
  fetchMock.mockClear()
})

describe("useRead", () => {
  test("fetching flow works if passed correct data", async () => {
    mockRouter.setCurrentUrl("/read?book=HAM&page=0")
    const { result } = renderHook(() => useRead())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({ type: "Fetching" })
    await waitFor(() => expect(result.all.length).toEqual(3))
    expect((result.all[2] as any).results).toEqual({
      type: "Fetched",
      value: makeReadBookResultFixture(),
    })
  })

  test("fetching flow doest not work if passed off-book page", async () => {
    mockRouter.setCurrentUrl("/api/read?book=HAM&page=1234")
    const { result } = renderHook(() => useRead())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({ type: "Fetching" })
    await waitFor(() => expect(result.all.length).toEqual(3))
    expect((result.all[2] as any).results).toEqual({
      type: "Error",
      message: "Off-book page",
    })
  })

  test("fetching flow doest not work if passed invalid book name", async () => {
    mockRouter.setCurrentUrl("/api/read?book=HAMMY&page=123")
    const { result } = renderHook(() => useRead())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({
      type: "Error",
      message: "Invalid book",
    })
  })

  test("fetching flow does not work if passed negative page", async () => {
    mockRouter.setCurrentUrl("/api/read?book=HAM&page=-123")
    const { result } = renderHook(() => useRead())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({
      type: "Error",
      message: "Invalid page",
    })
  })
})
