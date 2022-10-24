import { decalredShortNames } from "./contents"
import { makeReadBookResultFixture, makeSearchResultFixture } from "./fixtures"
import {
  searchResultSchema,
  readResultSchema,
  getValidatedPageNumber,
  extractBooksFromQuery,
  isBooksArgument,
} from "./validation"

describe("searchResultSchema", () => {
  test("validate with positive result", () => {
    expect(searchResultSchema.safeParse(makeSearchResultFixture()).success).toBeTruthy()
  })

  test("validate empty object with negative result", () => {
    expect(searchResultSchema.safeParse({}).success).toBeFalsy()
  })
})

describe("searchResultSchema", () => {
  test("validate with positive result", () => {
    expect(readResultSchema.safeParse(makeReadBookResultFixture()).success).toBeTruthy()
  })

  test("validate empty object with negative result", () => {
    expect(readResultSchema.safeParse({}).success).toBeFalsy()
  })
})

describe("getValidatedPageNumber", () => {
  test("fails with falsy values", () => {
    expect(getValidatedPageNumber(undefined).type).toEqual("Error")
    expect(getValidatedPageNumber([]).type).toEqual("Error")
    expect(getValidatedPageNumber(["1"]).type).toEqual("Error")
    expect(getValidatedPageNumber("-1").type).toEqual("Error")
    expect(getValidatedPageNumber("1.5").type).toEqual("Error")
  })

  test("passes with proper values", () => {
    expect(getValidatedPageNumber("0").type).toBe("Ok")
    expect(getValidatedPageNumber("1").type).toBe("Ok")
    expect(getValidatedPageNumber("100").type).toBe("Ok")
    expect(getValidatedPageNumber("10000").type).toBe("Ok")
  })
})

describe("extractBooksFromQuery", () => {
  test("filter wrong values", () => {
    expect(extractBooksFromQuery(undefined)).toEqual([])
    expect(extractBooksFromQuery("ASD")).toEqual([])
    expect(extractBooksFromQuery(["ASD"])).toEqual([])
    expect(extractBooksFromQuery(["ASD", "QWE", "FOO", "BAR"])).toEqual([])
  })

  test("passes with proper values", () => {
    expect(extractBooksFromQuery([])).toEqual([])
    expect(extractBooksFromQuery(["HAM"])).toEqual(["HAM"])
    expect(extractBooksFromQuery(["HAM", "CLEO"])).toEqual(["HAM", "CLEO"])
    expect(extractBooksFromQuery(decalredShortNames as any).length).toEqual(44)
  })
})

describe("isBooksArgument", () => {
  test("filter wrong values", () => {
    expect(isBooksArgument(undefined)).toBeFalsy()
    expect(isBooksArgument("ASD")).toBeFalsy()
    expect(isBooksArgument(["ASD"])).toBeFalsy()
    expect(isBooksArgument(["ASD", "QWE", "FOO", "BAR"])).toBeFalsy()
  })

  test("passes with proper values", () => {
    expect(isBooksArgument([])).toBeTruthy()
    expect(isBooksArgument(["HAM"])).toBeTruthy()
    expect(isBooksArgument(["HAM", "CLEO"])).toBeTruthy()
    expect(isBooksArgument(decalredShortNames as any)).toBeTruthy()
  })
})
