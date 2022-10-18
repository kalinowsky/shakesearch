import { readFileSync } from "fs"
import Fuse from "fuse.js"
import { contents, ShortName, shortNames } from "./contents"

export const loadData = () => {
  const booksByTitle: Record<ShortName, string[]> = Object.fromEntries(shortNames.map((n) => [n, []])) as any
  let currentTitle: ShortName | null = null

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

const mapBooksToSearchEngines = (booksByTitle: Record<ShortName, string[]>) => {
  const options = {
    includeMatches: true,
    includeScore: true,
    keys: ["value"],
    threshold: 0.25,
  }
  return Object.fromEntries(
    Object.keys(booksByTitle).map((key) => [key, new Fuse(booksByTitle[key as ShortName], options)])
  )
}

const searchEnginesMap = mapBooksToSearchEngines(booksByTitle)

export const searchInAll = (v: string, books: ShortName[] = []) => {
  return Object.keys(searchEnginesMap)
    .filter((key) => (books && Array.isArray(books) && books.length ? books.includes(key as ShortName) : true))
    .map((key) => {
      return searchEnginesMap[key].search(v).map((results) => ({ results, book: key }))
    })
    .reduce((acc, bookres) => [...acc, ...bookres], [])
    .sort((a, b) => (a.results.score || 0) - (b.results.score || 0))
}

export const getFullBookNameByShortName = (name: ShortName): string =>
  Object.keys(contents).find((k) => contents[k as keyof typeof contents].short === name) || ""

export const getBookLine = (book: ShortName, line: number) => booksByTitle[book][line]
