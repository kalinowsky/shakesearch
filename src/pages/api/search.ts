import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    res.status(200).json({ results: {} })
  } catch (err) {
    console.error(err)
  }
}
