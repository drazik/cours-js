import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator"
import User from 'App/Models/User'

export default class UsersController {
	public async register({ request }: HttpContextContract) {
		const userRequest = await request.validate({
			schema: schema.create({
				email: schema.string({}, [rules.email(), rules.unique({ table: "users", column: "email" })]),
				password: schema.string(),
			}),
			messages: {
				"email.required": "L'adresse e-mail est requise",
				"email.email": "Cette adresse e-mail n'est pas valide",
				"email.unique": "Cette adresse e-mail est déjà utilisée",
				"password.required": "Le mot de passe est requis"
			}
		})

		const user = await User.create(userRequest)

		return user
	}

	public async me({ auth }: HttpContextContract) {
		const user = await auth.authenticate()

		return user
	}
}
