import React from 'react'
import { PostsList } from './PostsList.js'
import { render } from '@testing-library/react'
import { getPosts } from './api.js'

describe('PostsList', () => {
  let posts = [
      {
        id: 'post1',
        author: 'drazik',
        content: 'this is an existing post',
        date: '2020-02-26'
      }
    ]

  it('should show posts passed to props', () => {
    let { getByText } = render(<PostsList posts={posts} />)

    expect(getByText('drazik')).toBeDefined()
    expect(getByText('this is an existing post')).toBeDefined()
    expect(getByText('26/02/2020')).toBeDefined()
  })
})
