import { ShortName, shortNames } from "./contents"

export const isBookShortName = (v: string | string[] | undefined): v is ShortName =>
  typeof v === "string" && shortNames.includes(v as ShortName)

export const isString = (v: string | string[] | undefined): v is string => typeof v === "string"
export const isBooksArgument = (v: string | string[] | undefined): v is ShortName[] =>
  !!(v && Array.isArray(v) && v.every((book) => shortNames.includes(book as ShortName)))
