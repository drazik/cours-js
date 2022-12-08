import { rest } from "msw"
import { faker } from "@faker-js/faker/locale/fr"

export const handlers = [
	rest.get("/posts", (_req, res, ctx) => {
		return res(ctx.status(200), ctx.json(posts))
	}),
]

const posts = Array.from({ length: 20 }).map(() => {
	return {
		id: faker.datatype.uuid(),
		publishedAt: faker.date.between(new Date(2022, 0, 1), new Date()),
		title: faker.lorem.sentence(),
		excerpt: faker.lorem.paragraph(),
		content: faker.lorem.paragraphs(10),
	}
})
