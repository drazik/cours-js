import * as Slider from "./src/slider"

const sliderRoot = document.querySelector(".slider")

if (!sliderRoot) {
	throw new Error("Couldn't find slider root")
}

const slider = Slider.init(sliderRoot)

window.__slider__ = slider
