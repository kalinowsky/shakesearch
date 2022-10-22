import { ReadResult, SearchResult } from "./validation"

export const makeSearchResultFixture = (overrides?: Partial<SearchResult>): SearchResult => ({
  total: 10,
  items: [
    {
      value: "HAMLET.\r",
      score: 0.001,
      book: { shortName: "HAM", line: 491, page: 16, size: 223 },
      context: {
        next: "[_Aside._] A little more than kin, and less than kind.\r\rKING.\r",
        previous:
          "And thy best graces spend it at thy will!\rBut now, my cousin Hamlet, and my son—\r\r",
      },
    },
    {
      value: "HAMLET.\r",
      score: 0.001,
      book: { shortName: "HAM", line: 497, page: 16, size: 223 },
      context: {
        next: "Not so, my lord, I am too much i’ the sun.\r\rQUEEN.\r",
        previous: "KING.\rHow is it that the clouds still hang on you?\r\r",
      },
    },
  ],
  search: { phrase: "hamlet", books: [] },
  ...(overrides || {}),
})

export const makeReadBookResultFixture = (): ReadResult => ({
  book: { size: 223, shortName: "HAM", page: 0 },
  content: [
    "THE TRAGEDY OF HAMLET, PRINCE OF DENMARK\r",
    "\r",
    "\r",
    "\r",
    "Contents\r",
    "\r",
    "ACT I\r",
    "Scene I. Elsinore. A platform before the Castle.\r",
    "Scene II. Elsinore. A room of state in the Castle\r",
    "Scene III. A room in Polonius’s house.\r",
    "Scene IV. The platform.\r",
    "Scene V. A more remote part of the Castle.\r",
    "\r",
    "ACT II\r",
    "Scene I. A room in Polonius’s house.\r",
    "Scene II. A room in the Castle.\r",
    "\r",
    "ACT III\r",
    "Scene I. A room in the Castle.\r",
    "Scene II. A hall in the Castle.\r",
    "Scene III. A room in the Castle.\r",
    "Scene IV. Another room in the Castle.\r",
    "\r",
    "ACT IV\r",
    "Scene I. A room in the Castle.\r",
    "Scene II. Another room in the Castle.\r",
    "Scene III. Another room in the Castle.\r",
    "Scene IV. A plain in Denmark.\r",
    "Scene V. Elsinore. A room in the Castle.\r",
    "Scene VI. Another room in the Castle.\r",
  ],
})
