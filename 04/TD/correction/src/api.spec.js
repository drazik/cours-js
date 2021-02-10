import { registerUser } from "./api"

describe("registerUser", () => {
  describe("lorsque le serveur renvoie une réponse OK", () => {
    it("la promise doit être résolue avec la donnée renvoyée par le serveur", async () => {
      const userData = new FormData()
      userData.append("email", "john@doe.com")
      userData.append("password", "azer")
      userData.append("firstname", "John")
      userData.append("lastname", "Doe")

      const registeredUser = await registerUser(userData)

      expect(registeredUser).toEqual({
        id: expect.any(Number),
        email: "john@doe.com",
        password: "azer",
        firstname: "John",
        lastname: "Doe",
      })
    })
  })

  describe("lorsque le serveur renvoie une erreur 400", () => {
    it("la promise doit être rejetée avec une erreur contenant les erreurs renvoyées par le serveur", async () => {
      const userData = new FormData()
      userData.append("email", "john@doe.com")
      userData.append("password", "azer")
      userData.append("firstname", "John")
      userData.append("lastname", "Doe")

      try {
        await registerUser(userData)
      } catch (error) {
        expect(error).toEqual({
          errors: {
            global: expect.any(String),
          },
        })
      }
    })
  })

  describe("lorsque le serveur renvoie une autre erreur", () => {
    it("la promise doit être rejetée avec une erreur générique", async () => {
      const userData = new FormData()
      userData.append("email", "john@doe.com")
      userData.append("password", "azer")
      userData.append("firstname", "John")
      userData.append("lastname", "500")

      try {
        await registerUser(userData)
      } catch (error) {
        expect(error.message).toEqual("Erreur inconnue")
      }
    })
  })
})
