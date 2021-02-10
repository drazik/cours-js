import { server } from "./src/mocks/server.js"
import "regenerator-runtime/runtime"
import fetch from "node-fetch"

if (!window.fetch) {
  window.fetch = fetch
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
