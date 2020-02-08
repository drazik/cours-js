import { initForm } from './form'
import { fireEvent, getByPlaceholderText } from '@testing-library/dom'

function setupDOM() {
  let root = document.createElement('form')
  root.innerHTML = '<input type="text" placeholder="Huile..." />'

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

  it('should do nothing if the input is empty or contains only spaces', () => {
    let root = setupDOM()
    let input = getByPlaceholderText(root, /huile/i)
    let onSubmit = jest.fn()

    initForm(root, onSubmit)

    fireEvent.submit(root)
    expect(onSubmit).not.toHaveBeenCalled()

    input.value = '      '

    fireEvent.submit(root)
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
