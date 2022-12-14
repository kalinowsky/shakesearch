export const contents = {
  "THE SONNETS": { startsAt: 133, short: "SONN" },
  "ALL’S WELL THAT ENDS WELL": { startsAt: 2910, short: "WTEW" },
  "THE TRAGEDY OF ANTONY AND CLEOPATRA": { startsAt: 7874, short: "CLEO" },
  "AS YOU LIKE IT": { startsAt: 14515, short: "AYLI" },
  "THE COMEDY OF ERRORS": { startsAt: 17307, short: "ERR" },
  "THE TRAGEDY OF CORIOLANUS": { startsAt: 20508, short: "COR" },
  CYMBELINE: { startsAt: 24625, short: "CYM" },
  "THE TRAGEDY OF HAMLET, PRINCE OF DENMARK": { startsAt: 30500, short: "HAM" },
  "THE FIRST PART OF KING HENRY THE FOURTH": { startsAt: 37187, short: "FPOKHF" },
  "THE SECOND PART OF KING HENRY THE FOURTH": { startsAt: 41903, short: "SPOKHF" },
  "THE LIFE OF KING HENRY THE FIFTH": { startsAt: 45312, short: "LOKHS" },
  "THE FIRST PART OF HENRY THE SIXTH": { startsAt: 50248, short: "FPOHS" },
  "THE SECOND PART OF KING HENRY THE SIXTH": { startsAt: 53519, short: "SPOKHS" },
  "THE THIRD PART OF KING HENRY THE SIXTH": { startsAt: 57007, short: "TPOKHS" },
  "KING HENRY THE EIGHTH": { startsAt: 60353, short: "KHE" },
  "KING JOHN": { startsAt: 64002, short: "JOHN" },
  "THE TRAGEDY OF JULIUS CAESAR": { startsAt: 66919, short: "CESAR" },
  "THE TRAGEDY OF KING LEAR": { startsAt: 71563, short: "LEAR" },
  "LOVE’S LABOUR’S LOST": { startsAt: 77599, short: "LLL" },
  "THE TRAGEDY OF MACBETH": { startsAt: 80514, short: "MAC" },
  "MEASURE FOR MEASURE": { startsAt: 84663, short: "MFM" },
  "THE MERCHANT OF VENICE": { startsAt: 87663, short: "MOV" },
  "THE MERRY WIVES OF WINDSOR": { startsAt: 91831, short: "MWOW" },
  "A MIDSUMMER NIGHT’S DREAM": { startsAt: 94790, short: "MND" },
  "MUCH ADO ABOUT NOTHING": { startsAt: 98250, short: "MAAN" },
  "THE TRAGEDY OF OTHELLO, MOOR OF VENICE": { startsAt: 103962, short: "OTH" },
  "PERICLES, PRINCE OF TYRE": { startsAt: 110232, short: "PRINCE" },
  "KING RICHARD THE SECOND": { startsAt: 114371, short: "KRS" },
  "KING RICHARD THE THIRD": { startsAt: 117468, short: "KRT" },
  "THE TRAGEDY OF ROMEO AND JULIET": { startsAt: 121876, short: "ROMEO" },
  "THE TAMING OF THE SHREW": { startsAt: 127132, short: "TOS" },
  "THE TEMPEST": { startsAt: 132006, short: "TEMP" },
  "THE LIFE OF TIMON OF ATHENS": { startsAt: 135829, short: "LOTOA" },
  "THE TRAGEDY OF TITUS ANDRONICUS": { startsAt: 138545, short: "TITUS" },
  "THE HISTORY OF TROILUS AND CRESSIDA": { startsAt: 141421, short: "HOTAC" },
  "TWELFTH NIGHT; OR, WHAT YOU WILL": { startsAt: 147584, short: "NIGHT" },
  "THE TWO GENTLEMEN OF VERONA": { startsAt: 152067, short: "TGOV" },
  "THE TWO NOBLE KINSMEN": { startsAt: 154479, short: "TNK" },
  "THE WINTER’S TALE": { startsAt: 159667, short: "WINT" },
  "A LOVER’S COMPLAINT": { startsAt: 164682, short: "LOV" },
  "THE PASSIONATE PILGRIM": { startsAt: 165065, short: "PP" },
  "THE PHOENIX AND THE TURTLE": { startsAt: 165305, short: "PAT" },
  "THE RAPE OF LUCRECE": { startsAt: 165399, short: "ROL" },
  "VENUS AND ADONIS": { startsAt: 167584, short: "VEN" },
} as const

export const shortNames = Object.values(contents).map((val) => val.short)

export type FullBookName = keyof typeof contents
export type ShortBookName = typeof contents[FullBookName]["short"]

export const getFullBookNameByShortName = (name: ShortBookName): string =>
  Object.keys(contents).find((k) => contents[k as keyof typeof contents].short === name) || ""

export const getPageInformation = (book: { size: number; page: number }) =>
  `${book.page + 1}/${book.size}`

export const decalredShortNames = [
  "SONN",
  "WTEW",
  "CLEO",
  "AYLI",
  "ERR",
  "COR",
  "CYM",
  "HAM",
  "FPOKHF",
  "SPOKHF",
  "LOKHS",
  "FPOHS",
  "SPOKHS",
  "TPOKHS",
  "KHE",
  "JOHN",
  "CESAR",
  "LEAR",
  "LLL",
  "MAC",
  "MFM",
  "MOV",
  "MWOW",
  "MND",
  "MAAN",
  "OTH",
  "PRINCE",
  "KRS",
  "KRT",
  "ROMEO",
  "TOS",
  "TEMP",
  "LOTOA",
  "TITUS",
  "HOTAC",
  "NIGHT",
  "TGOV",
  "TNK",
  "WINT",
  "LOV",
  "PP",
  "PAT",
  "ROL",
  "VEN",
] as const
