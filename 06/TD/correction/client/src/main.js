import "bootstrap/dist/css/bootstrap.css"
import Navigo from "navigo"
import * as App from "./components/App"

const appElement = document.getElementById("app")
const router = new Navigo("/")
App.init(appElement, router)
