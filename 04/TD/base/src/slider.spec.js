import { init } from "./slider.js"
import { getByRole, getAllByRole } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"

const dom = `
<div class="slider">
  <ul class="slider__slides">
    <li class="slider__slide"></li>
    <li class="slider__slide"></li>
  </ul>
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
  test.skip("root element is correct", () => {
    const { root, slider } = setup()

    expect(slider.elements.root).toBe(root)
  })

  test.skip("creates bullets", () => {
    const { root } = setup()

    expect(getAllByRole(root, "button", { name: /go to slide/i })).toHaveLength(
      2
    )
  })

  // TODO premier test à activer
  test.skip("creates controls elements", () => {
    const { root } = setup()

    const previousButton = getByRole(root, "button", { name: "Previous" })
    const nextButton = getByRole(root, "button", { name: "Next" })

    expect(previousButton).toHaveClass("slider__control--previous")
    expect(nextButton).toHaveClass("slider__control--next")
  })

  // TODO deuxième tester à activer
  test.skip("slidesContainer element is correct", () => {
    const { root, slider } = setup()
    const slidesContainer = root.querySelector(".slider__slides")

    expect(slider.elements.slidesContainer).toBe(slidesContainer)
  })

  test.skip("slides elements are correct", () => {
    const { root, slider } = setup()
    const slidesContainer = root.querySelector(".slider__slides")
    const slides = Array.from(
      slidesContainer.querySelectorAll(".slider__slide")
    )

    expect(slider.elements.slides).toEqual(slides)
  })
})

describe("previous", () => {
  test.skip("does nothing when already on first slide", () => {
    const { slider } = setup()

    slider.previous()

    expect(slider.elements.slidesContainer.style.transform).toBe(
      "translateX(0%)"
    )
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

describe("goTo", () => {
  test.skip("throws an error when given a negative index", () => {
    const { slider } = setup()

    expect(() => slider.goTo(-1)).toThrowError("Given an index lesser than 0")
  })

  test.skip("throws an error when given an index higher than last slide index", () => {
    const { slider } = setup()

    expect(() => slider.goTo(slider.elements.slides.length)).toThrowError(
      "Given an index higher than total number of slides"
    )
  })

  test.skip("goes to the slide at given index", () => {
    const { slider } = setup()

    slider.goTo(1)

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

  test.skip("goes to previous slide when clicking on previous control", () => {
    const { root, slider } = setup()

    slider.next()

    const previousButton = getByRole(root, "button", { name: "Previous" })
    userEvent.click(previousButton)

    expect(slider.elements.slidesContainer.style.transform).toBe(
      "translateX(0%)"
    )
  })

  test.skip("goes to next slide when clicking on next control", () => {
    const { root, slider } = setup()

    const nextButton = getByRole(root, "button", { name: "Next" })
    userEvent.click(nextButton)

    expect(slider.elements.slidesContainer.style.transform).toBe(
      "translateX(-100%)"
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

  test.skip("goes to the good slide when clicking on a bullet", () => {
    const { root, slider } = setup()

    const bullets = getAllByRole(root, "button", { name: /go to slide/i })

    bullets.forEach((bullet, index) => {
      userEvent.click(bullet)

      expect(slider.elements.slidesContainer.style.transform).toBe(
        `translateX(${-index * 100}%)`
      )
    })
  })
})

describe("unmount", () => {
  test.skip("stops listening to click events on previous control", () => {
    const { root, slider } = setup()

    slider.next()
    slider.unmount()

    const previousButton = getByRole(root, "button", { name: "Previous" })

    userEvent.click(previousButton)

    expect(slider.elements.slidesContainer.style.transform).toBe(
      "translateX(-100%)"
    )
  })

  test.skip("stops listening to click events on next control", () => {
    const { root, slider } = setup()

    slider.unmount()

    const nextButton = getByRole(root, "button", { name: "Next" })

    userEvent.click(nextButton)

    expect(slider.elements.slidesContainer.style.transform).toBe(
      "translateX(0%)"
    )
  })

  test.skip("stops listening to click events on bullets", () => {
    const { root, slider } = setup()

    slider.unmount()

    const bullets = getAllByRole(root, "button", { name: /go to slide/i })

    bullets.forEach((bullet) => {
      userEvent.click(bullet)

      expect(slider.elements.slidesContainer.style.transform).toBe(
        "translateX(0%)"
      )
    })
  })
})