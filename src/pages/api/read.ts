import type { NextApiRequest, NextApiResponse } from "next"
import { getBookPage, getBookSizeInPages } from "../../services/book"
import { getValidatedPageNumber, isBookShortName } from "../../services/validation"

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { book, page } = req.query
    if (!isBookShortName(book)) return res.status(400).json({ error: "Invalid book" })
    const size = getBookSizeInPages(book)
    const pageNumberResult = getValidatedPageNumber(page)

    if (pageNumberResult.type === "Error")
      return res.status(400).json({ error: "Invalid page type" })

    if (pageNumberResult.value > size) return res.status(400).json({ error: "Off-book page" })

    const content = getBookPage(book, pageNumberResult.value)
    res.status(200).json({ book: { size }, content })
  } catch (err) {
    console.error(err)
  }
}
