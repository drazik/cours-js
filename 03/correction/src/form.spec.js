import { initForm } from './form'
import {
  fireEvent,
  getByPlaceholderText,
  getByText
} from '@testing-library/dom'
import '@testing-library/jest-dom'

function setupDOM(initialValue = '') {
  let root = document.createElement('form')
  root.innerHTML = `
    <input type="text" placeholder="Huile..." class="js-form-input" value="${initialValue}" />
    <button type="submit" class="js-form-submit">+</button>
  `

  return root
}

describe('initForm', () => {
  it('should call the given `onSubmit` function with input trimmed value when submitted', () => {
    let root = setupDOM()
    let input = getByPlaceholderText(root, /huile/i)
    let onSubmit = jest.fn()

    initForm(root, onSubmit)

    input.value = ' Huile'
    fireEvent.submit(root)

    expect(onSubmit).toHaveBeenCalledWith('Huile')
  })

  it('should disable the submit button by default if the input is empty', () => {
    let root = setupDOM()
    let submitButton = getByText(root, '+')
    let onSubmit = jest.fn()

    initForm(root, onSubmit)

    expect(submitButton).toBeDisabled()
  })

  it('should enable the submit button by default if the input has a value', () => {
    let root = setupDOM('huile')
    let submitButton = getByText(root, '+')
    let onSubmit = jest.fn()

    initForm(root, onSubmit)

    expect(submitButton).toBeEnabled()
  })

  xit('should enable the submit button when the user types something', async () => {
    let root = setupDOM()
    let input = getByPlaceholderText(root, /huile/i)
    let submitButton = getByText(root, '+')
    let onSubmit = jest.fn()

    initForm(root, onSubmit)

    fireEvent.keyUp(input, { key: 'h', keyCode: 72 })
    expect(submitButton).toBeEnabled()

    fireEvent.keyUp(input, { key: 'backspace', keyCode: 8 })
    expect(submitButton).toBeDisabled()
  })
})
