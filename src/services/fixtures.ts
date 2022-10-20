import { SearchResult } from "./validation"

export const makeSearchResultFixture = (overrides?: Partial<SearchResult>): SearchResult => ({
  value: "HAMLET.\r",
  score: 0.001,
  book: { shortName: "HAM", line: 491, page: 16, pages: 223 },
  context: {
    next: "[_Aside._] A little more than kin, and less than kind.\r\rKING.\r",
    previous:
      "And thy best graces spend it at thy will!\rBut now, my cousin Hamlet, and my son—\r\r",
  },
  ...(overrides || {}),
})
