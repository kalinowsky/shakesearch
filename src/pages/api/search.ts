import type { NextApiRequest, NextApiResponse } from "next"
import { getBookLine, getBookSizeInPages, searchInAll } from "../../services/book"
import { ShortName } from "../../services/contents"
import { isBooksArgument, isString } from "../../services/validation"

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { phrase, books, limit = "20" } = req.query

    if (!isString(phrase) || phrase.length < 4)
      return res.status(400).json({ error: "Too short phrase" })
    if (!isBooksArgument(books)) return res.status(400).json({ error: "Invalid books" })
    if (!["all", "20"].includes(Array.isArray(limit) ? limit[0] : limit))
      return res.status(400).json({ error: "Invalid limit" })

    const searchResults = searchInAll(phrase, books)

    const resultsWithAdditionalLines = searchResults.slice(0, 20).map((res) => ({
      ...res,
      context: {
        next:
          getBookLine(res.book as ShortName, res.results.refIndex + 1) +
          getBookLine(res.book as ShortName, res.results.refIndex + 2) +
          getBookLine(res.book as ShortName, res.results.refIndex + 3),
        previous:
          getBookLine(res.book as ShortName, res.results.refIndex - 3) +
          getBookLine(res.book as ShortName, res.results.refIndex - 2) +
          getBookLine(res.book as ShortName, res.results.refIndex - 1),
        page: Math.floor(res.results.refIndex / 30),
        pages: getBookSizeInPages(res.book as ShortName),
      },
    }))

    res.status(200).json(resultsWithAdditionalLines)
  } catch (err) {
    console.error(err)
  }
}
