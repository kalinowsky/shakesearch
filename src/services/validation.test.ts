import { makeSearchResultFixture } from "./fixtures"
import { searchResultSchema } from "./validation"

describe("searchResultSchema", () => {
  it("validate with positive result", () => {
    expect(searchResultSchema.safeParse(makeSearchResultFixture()).success).toBeTruthy()
  })
})
