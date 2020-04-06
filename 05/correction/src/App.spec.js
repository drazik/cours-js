import React from 'react'
import { App } from './App.js'
import { render, wait } from '@testing-library/react'
import { getPosts } from './api.js'

jest.mock('./api.js')

describe('App', () => {
  beforeEach(() => {
    getPosts.mockResolvedValue([{
      id: 'post1',
      author: 'drazik',
      content: 'Hey ho hello',
      date: '2020-03-04'
    }])
  })

  it('should fetch existing posts when mounted', () => {
    let { getByText } = render(<App />)

    expect(getPosts).toHaveBeenCalled()

    wait(() => {
      expect(getByText('drazi')).toBeDefined()
      expect(getByText('Hey ho hello')).toBeDefined()
      expect(getByText('04/03/2020')).toBeDefined()
    })
  })
})
