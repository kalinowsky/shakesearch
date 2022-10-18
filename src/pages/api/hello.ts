// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { booksByTitle, searchInAll } from "../../services/book"

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(Object.values(booksByTitle).map((v) => v.length))
  console.log({ results: searchInAll("hamlet") })
  res.status(200).json({ results: searchInAll("hamlet") } as any)
}
