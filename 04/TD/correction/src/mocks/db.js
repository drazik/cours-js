export const getUserByEmail = (email) => {
  const data = openDB()
  const user = data.users.find((user) => user.email === email)

  return user
}

const DATA_KEY = "data"

const openDB = () => {
  bootstrapDBIfNeeded()
  const data = getData()

  return data
}

const bootstrapDBIfNeeded = () => {
  const data = localStorage.getItem(DATA_KEY)

  if (!data) {
    bootstrapDB()
  }
}

const bootstrapDB = () => {
  const data = {
    users: [],
  }

  localStorage.setItem(DATA_KEY, JSON.stringify(data))
}

const getData = () => {
  const rawData = localStorage.getItem(DATA_KEY)

  return JSON.parse(rawData)
}

export const createUser = (user) => {
  const data = openDB()
  const userWithId = {
    ...user,
    id: Date.now(),
  }

  data.users = [...data.users, userWithId]

  writeData(data)

  return userWithId
}

const writeData = (data) => {
  localStorage.setItem(DATA_KEY, JSON.stringify(data))
}
