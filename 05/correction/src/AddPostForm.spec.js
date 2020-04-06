import React from 'react'
import { AddPostForm } from './AddPostForm.js'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { createPost } from './api.js'

jest.mock('./api.js')

describe('AddPostForm', () => {
  let onSuccess = jest.fn()

  afterEach(() => {
    createPost.mockReset()
    onSuccess.mockReset()
  })

  it('should show an author field', () => {
    let { getByLabelText } = render(<AddPostForm />)

    expect(getByLabelText('Who are you?')).toBeDefined()
  })

  it('should show a content field', () => {
    let { getByLabelText } = render(<AddPostForm />)

    expect(getByLabelText("What's on your mind?")).toBeDefined()
  })

  it('should show a submit button', () => {
    let { getByText } = render(<AddPostForm />)

    expect(getByText('Send')).toBeDefined()
  })

  describe('when submitted', () => {
    beforeEach(() => {
      createPost.mockResolvedValue()
    })

    it('should disable the submit button', () => {
      let { getByText } = render(<AddPostForm onSuccess={onSuccess} />)
      let submitButton = getByText('Send')
      fireEvent.click(submitButton)

      expect(submitButton).toBeDisabled()
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

    it('should reset the content field', () => {
      let { getByLabelText, getByText } = render(<AddPostForm onSuccess={onSuccess} />)
      let submitBtn = getByText('Send')
      let contentField = getByLabelText("What's on your mind?")

      fireEvent.change(contentField, { target: { value: 'Something' } })
      fireEvent.click(submitBtn)

      wait(() => {
        expect(contentField).toHaveValue('')
      })
    })

    it('should enable the submit button', () => {
      let { getByText } = render(<AddPostForm onSuccess={onSuccess} />)
      let submitBtn = getByText('Send')
      fireEvent.click(submitBtn)

      wait(() => {
        expect(submitBtn).not.toBeDisabled()
      })
    })

    it('should call the onSuccess callback', () => {
      let { getByText } = render(<AddPostForm onSuccess={onSuccess} />)
      let submitBtn = getByText('Send')
      fireEvent.click(submitBtn)

      wait(() => {
        expect(onSuccess).toHaveBeenCalled()
      })
    })
  })
})
