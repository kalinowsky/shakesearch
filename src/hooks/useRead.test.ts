import { renderHook } from "@testing-library/react-hooks"
import { waitFor } from "@testing-library/react"

import { useRead } from "./useRead"
import mockRouter from "next-router-mock"
import { makeReadBookResultFixture } from "../services/fixtures"

jest.mock("next/router", () => require("next-router-mock"))

const fetchMock = jest.fn((v) =>
  Promise.resolve({
    json: () => Promise.resolve(makeReadBookResultFixture()),
  })
)

;(global.fetch as any) = fetchMock

beforeEach(() => {
  mockRouter.setCurrentUrl("/read?book=HAM&page=0")
})

describe("useRead", () => {
  test("fetching flow", async () => {
    const { result } = renderHook(() => useRead())
    expect((result.all[0] as any).results).toEqual({ type: "NotFetched" })
    expect((result.all[1] as any).results).toEqual({ type: "Fetching" })
    await waitFor(() => expect(result.all.length).toEqual(3))
    expect((result.all[2] as any).results).toEqual({
      type: "Fetched",
      value: makeReadBookResultFixture(),
    })
  })
})
