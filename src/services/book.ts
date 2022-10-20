import { readFileSync } from "fs"
import Fuse from "fuse.js"
import { contents, ShortBookName, shortNames } from "./contents"

const PAGE_SIZE = 30

export const loadData = () => {
  const booksByTitle: Record<ShortBookName, string[]> = Object.fromEntries(
    shortNames.map((n) => [n, []])
  ) as any
  let currentTitle: ShortBookName | null = null

  const data = readFileSync("completeworks.txt", "utf8")
  const lines = data.split("\n")
  const titleLines: number[] = Object.values(contents).map((v) => v.startsAt)

  const mapped = lines.map((line, index) => {
    const isTitleLine = titleLines.includes(index)

    if (isTitleLine) {
      // const title = Object.values(contents).find((v) => v.startsAt === index)?.short
      // const currentTitle = title
      currentTitle = Object.values(contents).find((v) => v.startsAt === index)?.short || null
    }

    if (currentTitle) booksByTitle[currentTitle].push(line)

    return {
      value: line,
      index,
    }
  })
  return booksByTitle
}

export const booksByTitle = loadData()

const mapBooksToSearchEngines = (booksByTitle: Record<ShortBookName, string[]>) => {
  const options = {
    includeMatches: true,
    includeScore: true,
    keys: ["value"],
    threshold: 0.25,
  }
  return Object.fromEntries(
    Object.keys(booksByTitle).map((key) => [
      key,
      new Fuse(booksByTitle[key as ShortBookName], options),
    ])
  )
}

const searchEnginesMap = mapBooksToSearchEngines(booksByTitle)

export const searchInAll = (v: string, books?: ShortBookName[]) => {
  return Object.keys(searchEnginesMap)
    .filter((key) =>
      books && Array.isArray(books) && books.length ? books.includes(key as ShortBookName) : true
    )
    .map((key) => {
      return searchEnginesMap[key].search(v).map((results) => ({ results, book: key }))
    })
    .reduce((acc, bookres) => [...acc, ...bookres], [])
    .sort((a, b) => (a.results.score || 0) - (b.results.score || 0))
}

export const getBookLine = (book: ShortBookName, line: number) => booksByTitle[book][line]
export const getBookPage = (book: ShortBookName, page: number) =>
  booksByTitle[book].slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
export const getBookSizeInLines = (book: ShortBookName) => booksByTitle[book].length
export const getBookSizeInPages = (book: ShortBookName) =>
  Math.ceil(getBookSizeInLines(book) / PAGE_SIZE)
