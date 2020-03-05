import { initAddPostForm } from './addPostForm.js'
import { fireEvent, getByText, getByLabelText, wait } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { createPost } from './api.js'

jest.mock('./api.js')

function getDOM() {
  let formElement = document.createElement('form')
  formElement.innerHTML = `
  <label for="post-author">Who are you?</label><input type="text" id="post-author" />
  <label for="post-content">What's on your mind?</label><input type="text" id="post-content" />
  <button type="submit">Send</button>
  `

  return formElement
}

describe('addPostForm', () => {
  let onSuccess = jest.fn()

  afterEach(() => {
    createPost.mockReset()
    onSuccess.mockReset()
  })

  describe('when submitted', () => {
    beforeEach(() => {
      createPost.mockResolvedValue()
    })

    it('should disable the submit button', () => {
      let formElement = getDOM()
      initAddPostForm(formElement, onSuccess)

      fireEvent.submit(formElement)

      expect(getByText(formElement, 'Send')).toBeDisabled()
    })

    describe('when there is an error message', () => {
      it('should remove it', () => {
        createPost.mockRejectedValueOnce({
          message: 'author and content are required'
        })

        createPost.mockResolvedValueOnce({
          id: '1234',
          date: '2020-02-26',
          author: 'drazik',
          content: 'Something interesting'
        })
      })
    })
  })

  describe('when success', () => {
    beforeEach(() => {
      createPost.mockResolvedValue({
        id: '1234',
        date: '2020-02-26',
        author: 'drazik',
        content: 'Something interesting'
      })
    })

    it('should reset the content field', async () => {
      let formElement = getDOM()
      initAddPostForm(formElement, onSuccess)

      let contentField = getByLabelText(formElement, "What's on your mind?")
      contentField.value = 'Something'

      fireEvent.submit(formElement, onSuccess)

      await wait(() => {
        expect(getByLabelText(formElement, "What's on your mind?")).toHaveValue('')
      })
    })

    it('should enable the submit button', async () => {
      let formElement = getDOM()
      initAddPostForm(formElement, onSuccess)

      fireEvent.submit(formElement)

      await wait(() => {
        expect(getByText(formElement, 'Send')).not.toBeDisabled()
      })
    })

    it('should call the onSuccess callback', async () => {
      let formElement = getDOM()
      initAddPostForm(formElement, onSuccess)

      fireEvent.submit(formElement)

      await wait(() => {
        expect(onSuccess).toHaveBeenCalled()
      })
    })
  })

  describe('when error', () => {
    beforeEach(() => {
      createPost.mockRejectedValue({
        message: 'author and content are required'
      })
    })

    it('should show an error message', async () => {
      let formElement = getDOM()
      initAddPostForm(formElement, onSuccess)

      fireEvent.submit(formElement)

      await wait(() => {
        expect(getByText(formElement, 'author and content are required')).toBeDefined()
      })
    })
  })
})
