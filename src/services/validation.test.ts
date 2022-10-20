import { makeSearchResultFixture } from "./fixtures"
import { searchResultsSchema } from "./validation"

describe("searchResultsSchema", () => {
  it("validate with positive result", () => {
    expect(searchResultsSchema.safeParse([]).success).toBeTruthy()
    expect(searchResultsSchema.safeParse([makeSearchResultFixture()]).success).toBeTruthy()
  })
})
