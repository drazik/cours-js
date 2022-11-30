/**
 * @param {HTMLElement} root
 */
export const init = (root) => {
  const elements = getElements(root);

	const goTo = (index) => {
		// TODO
	}

  return { elements, goTo };
}

/**
 * @param {HTMLElement} root
 * @returns {SliderElements}
 */
const getElements = (root) => {
	// TODO
}

/**
 * @typedef {Object} SliderElements
 * @property {HTMLElement} root
 * @property {HTMLElement[]} bullets
 * @property {SliderControls} controls
 * @property {HTMLElement} slidesContainer
 * @property {HTMLElement[]} slides
 */

/**
 * @typedef {Object} SliderControls
 * @property {HTMLElement} previous
 * @property {HTMLElement} next
 */

if (import.meta.vitest) {
	const { describe, it, expect } = import.meta.vitest

	const setup = () => {
		const dom = getDOM();
		const root = dom.querySelector(".slider");
		const slider = init(root);

		return { root, slider };
	}

	const getDOM = () => {
		const element = document.createElement("div")
		element.innerHTML = dom

		return element
	}

	const dom = `
		<div class="slider">
			<ul class="slider__slides">
				<li class="slider__slide">Slide 1</li>
				<li class="slider__slide">Slide 2</li>
			</ul>
			<div class="slider__bullets">
				<button
					class="slider__bullet slider__bullet--active"
					type="button"
				>Slide 1</button>
				<button class="slider__bullet" type="button">Slide 2</button>
			</div>
			<div class="slider__controls">
				<button class="slider__control slider__control--previous" type="button" aria-label="Previous">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15.208 18.29-6-6 6-6"/></svg>
				</button>
				<button class="slider__control slider__control--next" type="button" aria-label="Next">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 18 6-6-6-6"/></svg>
				</button>
			</div>
		</div>
	`

	describe("Récupération des éléments", () => {
		it.skip("L'élément root est bien récupéré", () => {
			const { root, slider } = setup()

			expect(slider.elements.root).toBe(root)
		})

		it.skip("Les éléments bullet sont bien récupérés", () => {
			const { root, slider } = setup()
			const bullets = Array.from(root.querySelectorAll(".slider__bullet"))

			expect(slider.elements.bullets).toEqual(bullets)
		})

		it.skip("Le bouton previous est bien récupéré", () => {
			const { root, slider } = setup()
			const previousButton = root.querySelector(".slider__control--previous")

			expect(slider.elements.controls.previous).toBe(previousButton)
		})

		it.skip("Le bouton next est bien récupéré", () => {
			const { root, slider } = setup()
			const nextButton = root.querySelector(".slider__control--next")

			expect(slider.elements.controls.next).toBe(nextButton)
		})

		it.skip("Le conteneur des slides est bien récupéré", () => {
			const { root, slider } = setup()
			const slidesContainer = root.querySelector(".slider__slides")

			expect(slider.elements.slidesContainer).toBe(slidesContainer)
		})

		it.skip("Les slides sont bien récupérées", () => {
			const { root, slider } = setup()
			const slides = Array.from(root.querySelectorAll(".slider__slide"))

			expect(slider.elements.slides).toEqual(slides)
		})
	})

	describe("Lors de l'initialisation", () => {
		it.skip("Le bouton previous est inactif", () => {
			const { slider } = setup()
			expect(slider.elements.controls.previous.disabled).toBe(true)
		})

		it.skip("Le bouton next est actif", () => {
			const { slider } = setup()
			expect(slider.elements.controls.next.disabled).toBe(false)
		})

		it.skip("La première slide est visible", () => {
			const { slider } = setup()

			expect(slider.elements.slidesContainer.style.translate).toBe("0%")
		})

		it.skip("L'élément bullet correspondant à la première slide est actif", () => {
			const { slider } = setup()
			expect(slider.elements.bullets[0].classList.contains("slider__bullet--active")).toBe(true)
		})

		it.skip("Les autres éléments bullet ne sont pas actifs", () => {
				const { slider } = setup()

				expect(
					slider.elements.bullets
						.slice(1)
						.every((bullet) => !bullet.classList.contains("slider__bullet--active"))
				).toBe(true)
		})
	})

	describe("Lorsque la fonction goTo est appelée", () => {
		describe("Si l'index est inférieur à 0", () => {
			it.skip("Une erreur est levée", () => {
				const { slider } = setup()
				expect(() => slider.goTo(-1)).toThrowError()
			})
		})

		describe("Si l'index est supérieur au nombre de slides", () => {
			it.skip("Une erreur est levée", () => {
				const { slider } = setup()

				expect(() => slider.goTo(slider.elements.slides.length + 1)).toThrowError()
			})
		})

		describe("Si l'index est correct", () => {
			it.skip("Le conteneur de slides est translaté de manière à afficher la bonne slide", () => {
				const { slider } = setup()

				slider.goTo(1)
				expect(slider.elements.slidesContainer.style.translate).toBe("-100%")
			})

			it.skip("L'élément bullet correspondant à la slide visible est actif", () => {
				const { slider } = setup()
				const index = 1
				slider.goTo(index)
				expect(slider.elements.bullets[index].classList.contains("slider__bullet--active")).toBe(true)
			})

			it.skip("Les éléments bullet ne correspondant pas à la slide visible sont inactifs", () => {
				const { slider } = setup()
				const index = 1
				slider.goTo(index)
				expect(
					slider.elements.bullets
						.filter((_bullet, bulletIndex) => bulletIndex !== index)
						.every((bullet) => !bullet.classList.contains("slider__bullet--active"))
				).toBe(true)
			})

			describe("Si l'index est 0", () => {
				it.skip("Le bouton previous doit être inactif", () => {
					const { slider } = setup()
					slider.goTo(1)
					slider.goTo(0)

					expect(slider.elements.controls.previous.disabled).toBe(true)
				})
			})

			describe("Si l'index est celui de la dernière slide", () => {
				it.skip("Le bouton next doit être inactif", () => {
					const { slider } = setup()
					slider.goTo(1)

					expect(slider.elements.controls.next.disabled).toBe(true)
				})
			})

			describe("Si l'index est supérieur à 0", () => {
				it.skip("Le bouton previous doit être actif", () => {
					const { slider } = setup()
					slider.goTo(1)

					expect(slider.elements.controls.previous.disabled).toBe(false)
				})
			})

			describe("Si l'index est inférieur à celui de la dernière slide", () => {
				it.skip("Le bouton next doit être actif", () => {
					const { slider } = setup()
					slider.goTo(1)
					slider.goTo(0)

					expect(slider.elements.controls.next.disabled).toBe(false)
				})
			})
		})
	})
}
