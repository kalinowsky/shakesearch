import type { NextApiRequest, NextApiResponse } from "next"
import { getBookLine, getBookSizeInPages, searchInAll } from "../../services/book"
import { ShortBookName } from "../../services/contents"
import { extractBooksFromQuery, isString } from "../../services/validation"

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { phrase, books, all } = req.query

    if (!isString(phrase) || phrase.length < 4)
      return res.status(400).json({ error: "Too short phrase" })

    const validatedBooks = extractBooksFromQuery(books)
    const searchResults = searchInAll(phrase, validatedBooks)
    const limitedResults = all === "true" ? searchResults : searchResults.slice(0, 20)
    const resultsWithAdditionalLines = limitedResults.map((res) => ({
      value: res.results.item,
      score: res.results.score,
      book: {
        shortName: res.book,
        line: res.results.refIndex,
        page: Math.floor(res.results.refIndex / 30),
        size: getBookSizeInPages(res.book as ShortBookName),
      },
      context: {
        next:
          getBookLine(res.book as ShortBookName, res.results.refIndex + 1) +
          getBookLine(res.book as ShortBookName, res.results.refIndex + 2) +
          getBookLine(res.book as ShortBookName, res.results.refIndex + 3),
        previous:
          getBookLine(res.book as ShortBookName, res.results.refIndex - 3) +
          getBookLine(res.book as ShortBookName, res.results.refIndex - 2) +
          getBookLine(res.book as ShortBookName, res.results.refIndex - 1),
      },
    }))

    res.status(200).json({
      total: searchResults.length,
      items: resultsWithAdditionalLines,
      search: { phrase, books: validatedBooks },
    })
  } catch (err) {
    console.error(err)
  }
}
