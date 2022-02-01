import { init } from "./slider.js"
import "@testing-library/jest-dom"

const dom = `
<div class="slider">
  <ul class="slider__slides">
    <li class="slider__slide"></li>
    <li class="slider__slide"></li>
  </ul>
  <div class="slider__bullets">
    <button
      class="slider__bullet slider__bullet--active"
      type="button"
    ></button>
    <button class="slider__bullet" type="button"></button>
  </div>
  <div class="slider__controls">
    <button class="slider__control slider__control--previous slider__control--hidden" type="button">
      Previous
    </button>
    <button class="slider__control slider__control--next" type="button">
      Next
    </button>
  </div>
</div>
`

const getDOM = () => {
  const element = document.createElement("div")
  element.innerHTML = dom

  return element
}

const setup = () => {
  const dom = getDOM()
  const root = dom.querySelector(".slider")
  const slider = init(root)

  return { root, slider }
}

describe("elements", () => {
  test("root element is correct", () => {
    const { root, slider } = setup()

    expect(slider.elements.root).toBe(root)
  })

  test("bullets element is correct", () => {
    const { root, slider } = setup()

    const bullets = Array.from(root.querySelectorAll(".slider__bullet"))

    expect(slider.elements.bullets).toEqual(bullets)
  })

  test("controls elements are correct", () => {
    const { root, slider } = setup()

    const previous = root.querySelector(".slider__control--previous")
    const next = root.querySelector(".slider__control--next")

    expect(slider.elements.controls.previous).toBe(previous)
    expect(slider.elements.controls.next).toBe(next)
  })

  test("slidesContainer element is correct", () => {
    const { root, slider } = setup()
    const slidesContainer = root.querySelector(".slider__slides")

    expect(slider.elements.slidesContainer).toBe(slidesContainer)
  })

  test("slides elements are correct", () => {
    const { root, slider } = setup()
    const slidesContainer = root.querySelector(".slider__slides")
    const slides = Array.from(
      slidesContainer.querySelectorAll(".slider__slide")
    )

    expect(slider.elements.slides).toEqual(slides)
  })
})

describe("previous", () => {
  test("does nothing when already on first slide", () => {
    const { slider } = setup()

    slider.previous()

    expect(slider.elements.slidesContainer.style.transform).toBe("")
  })

  test.skip("go to previous slide when not on first slide", () => {
    const { slider } = setup()

    slider.next()
    slider.previous()

    expect(slider.elements.slidesContainer.style.transform).toBe(
      "translateX(0%)"
    )
  })
})

describe("next", () => {
  test.skip("does nothing when already on last slide", () => {
    const { slider } = setup()

    slider.next()
    slider.next()

    expect(slider.elements.slidesContainer.style.transform).toBe(
      "translateX(-100%)"
    )
  })

  test.skip("go to next slide when not on last slide", () => {
    const { slider } = setup()

    slider.next()

    expect(slider.elements.slidesContainer.style.transform).toBe(
      "translateX(-100%)"
    )
  })
})

describe("controls", () => {
  test.skip("previous control is hidden when on first slide", () => {
    const { slider } = setup()

    expect(slider.elements.controls.previous).toHaveClass(
      "slider__control--hidden"
    )
  })

  test.skip("previous control is visible when not on first slide", () => {
    const { slider } = setup()

    slider.next()
    expect(slider.elements.controls.previous).not.toHaveClass(
      "slider__control--hidden"
    )
  })

  test.skip("next control is hidden when on last slide", () => {
    const { slider } = setup()

    slider.next()

    expect(slider.elements.controls.next).toHaveClass("slider__control--hidden")
  })

  test.skip("next control is visible when not on last slide", () => {
    const { slider } = setup()

    expect(slider.elements.controls.next).not.toHaveClass(
      "slider__control--hidden"
    )
  })
})

describe("bullets", () => {
  test.skip("bullet at current slide's index is active", () => {
    const { slider } = setup()

    expect(slider.elements.bullets[0]).toHaveClass("slider__bullet--active")
    expect(slider.elements.bullets[1]).not.toHaveClass("slider__bullet--active")

    slider.next()

    expect(slider.elements.bullets[0]).not.toHaveClass("slider__bullet--active")
    expect(slider.elements.bullets[1]).toHaveClass("slider__bullet--active")

    slider.previous()

    expect(slider.elements.bullets[0]).toHaveClass("slider__bullet--active")
    expect(slider.elements.bullets[1]).not.toHaveClass("slider__bullet--active")
  })
})
