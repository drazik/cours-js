import { rest } from "msw"
import { faker } from "@faker-js/faker/locale/fr"

export const handlers = [
	rest.post("/comment", (req, res, ctx) => {
		return res(ctx.status(201), ctx.json({ ...req.body, publishedAt: new Date().toISOString(), id: faker.datatype.uuid() }))
	}),

	rest.get("/comments", (_req, res, ctx) => {
		return res(ctx.status(200), ctx.json(allComments))
	})
]

const allComments = Array.from({ length: 10 }).map(() => {
	return {
		id: faker.datatype.uuid(),
		publishedAt: faker.date.between(new Date(2022, 0, 1), new Date()),
		email: faker.internet.email(),
		content: faker.lorem.paragraphs(5),
	}
})
