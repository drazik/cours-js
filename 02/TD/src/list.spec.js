import { createItemNode, initList } from './list'
import { getByLabelText, fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'

describe('createItemNode', () => {
  it('should create an item with the given label', () => {
    let item = createItemNode('huile')

    expect(item).toMatchSnapshot()
  })

  describe('when selecting an item', () => {
    it('should have the selected state', () => {
      let item = createItemNode('huile')
      let checkbox = getByLabelText(item, 'huile')

      fireEvent.click(checkbox)
      expect(item).toHaveClass('list__item--selected')

      fireEvent.click(checkbox)
      expect(item).not.toHaveClass('list__item--selected')
    })
  })

  describe('when removing an item', () => {
    it('should remove the item from the DOM', () => {
      let container = document.createElement('div')
      let item = createItemNode('huile')
      container.append(item)

      let removeBtn = getByLabelText(item, /supprimer/i)

      fireEvent.click(removeBtn)

      expect(() => getByLabelText(container, 'huile')).toThrow()
    })
  })
})

describe('initList', () => {
  it('should return an object exposing an `addItem` function', () => {
    let root = document.createElement('ul')
    let list = initList(root)

    expect(list.addItem).toBeInstanceOf(Function)

    list.addItem('farine')

    expect(getByLabelText(root, 'farine')).toBeTruthy()
  })
})
