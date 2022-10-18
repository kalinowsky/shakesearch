import type { NextApiRequest, NextApiResponse } from "next"
import { getBookPage, getBookSizeInPages } from "../../services/book"
import { isBookShortName } from "../../services/validation"

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const { book, page } = req.query
    if (!isBookShortName(book)) return res.status(400).json({ error: "Invalid book" })
    if (typeof page !== "string" || !Number.isInteger(parseInt(page)))
      return res.status(400).json({ error: "Invalid page type" })
    const bookPage = parseInt(page)
    if (bookPage > getBookSizeInPages(book)) return res.status(400).json({ error: "Off-book page" })
    const pageContent = getBookPage(book, bookPage)
    res.status(200).json(pageContent)
  } catch (err) {
    console.error(err)
  }
}
