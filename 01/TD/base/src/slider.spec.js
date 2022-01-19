import { init } from "./slider.js";

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
    <button class="slider__control slider__control--previous" type="button">
      Previous
    </button>
    <button class="slider__control slider__control--next" type="button">
      Next
    </button>
  </div>
</div>
`;

const getDOM = () => {
  const element = document.createElement("div");
  element.innerHTML = dom;

  return element;
};

const setup = () => {
  const dom = getDOM();
  const root = dom.querySelector(".slider");
  const slider = init(root);

  return { root, slider };
};

test.skip("root element is correct", () => {
  const { root, slider } = setup();

  expect(slider.elements.root).toBe(root);
});

test.skip("bullets element is correct", () => {
  const { root, slider } = setup();

  const bullets = Array.from(root.querySelectorAll(".slider__bullet"));

  expect(slider.elements.bullets).toEqual(bullets);
});

test.skip("controls elements are correct", () => {
  const { root, slider } = setup();

  const previous = root.querySelector(".slider__control--previous");
  const next = root.querySelector(".slider__control--next");

  expect(slider.elements.controls.previous).toBe(previous);
  expect(slider.elements.controls.next).toBe(next);
});

test.skip("slidesContainer element is correct", () => {
  const { root, slider } = setup();
  const slidesContainer = root.querySelector(".slider__slides");

  expect(slider.elements.slidesContainer).toBe(slidesContainer);
});

test.skip("slides elements are correct", () => {
  const { root, slider } = setup();
  const slidesContainer = root.querySelector(".slider__slides");
  const slides = Array.from(slidesContainer.querySelectorAll(".slider__slide"));

  expect(slider.elements.slides).toEqual(slides);
});
