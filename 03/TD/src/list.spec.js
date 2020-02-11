import { createItemNode, initList } from './list'
import { getByLabelText, fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

describe('createItemNode', () => {
  it('should create an item with the given label', () => {
    let item = createItemNode('huile')

    expect(item).toMatchSnapshot()
  })
})

describe('initList', () => {
  it('should return an object exposing an `addItem` function that', () => {
    let root = document.createElement('ul')
    let list = initList(root)

    expect(list.addItem).toBeInstanceOf(Function)

    list.addItem('farine')

    expect(getByLabelText(root, 'farine')).toBeTruthy()
  })

  it('should handle item removal', () => {
    let root = document.createElement('ul')
    let list = initList(root)

    list.addItem('farine')

    let removeBtn = getByLabelText(root, /supprimer/i)

    fireEvent.click(removeBtn)

    expect(() => getByLabelText(root, 'farine')).toThrow()
  })

  it('should handle item selection', () => {
    let root = document.createElement('ul')
    let list = initList(root)
    let item = list.addItem('farine')

    let checkbox = getByLabelText(item, 'farine')
    fireEvent.click(checkbox)

    expect(item).toHaveClass('list__item--selected')

    fireEvent.click(checkbox)
    expect(item).not.toHaveClass('list__item--selected')
  })
})
