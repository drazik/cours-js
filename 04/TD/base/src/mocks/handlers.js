import { rest } from "msw"
import * as db from "./db"

export const handlers = [
  rest.post("http://localhost:1234/register", (req, res, ctx) => {
    const body = req.body

    if (body.lastname === "500") {
      return res(ctx.status(500), ctx.json({}))
    }

    const missingFields = getMissingFields(body, [
      "email",
      "password",
      "firstname",
      "lastname",
    ])

    if (missingFields.length > 0) {
      const errors = missingFields.reduce((acc, val) => {
        acc[val] = `${val} is required`

        return acc
      }, {})

      return res(
        ctx.status(400),
        ctx.json({
          error: errors,
        })
      )
    }

    const existingUser = db.getUserByEmail(body.email)

    if (existingUser) {
      return res(
        ctx.status(400),
        ctx.json({
          errors: {
            global: "Un compte existe déjà pour cette adresse e-mail",
          },
        })
      )
    }

    const createdUser = db.createUser(body)

    return res(ctx.status(201), ctx.json(createdUser))
  }),
]

const getMissingFields = (body, requiredFields) => {
  const missingFields = requiredFields.filter(
    (requiredField) => !body[requiredField]
  )

  return missingFields
}
