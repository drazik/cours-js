import * as Menu from "./menu"

const menuRoot = document.querySelector(".menu")

if (!menuRoot) {
	throw new Error("No menu root found")
}

const menu = Menu.init(menuRoot)
