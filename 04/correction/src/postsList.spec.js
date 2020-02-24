import { initPostsList } from './postsList.js'
import { getByText, wait } from '@testing-library/dom'
import { getPosts } from './api.js'

jest.mock('./api.js')

function getDOM() {
  let postsListElement = document.createElement('div')

  return postsListElement
}

describe('postsList', () => {
  beforeEach(() => {
    getPosts.mockResolvedValue([
      {
        id: 'post1',
        author: 'drazik',
        content: 'this is an existing post',
        date: '2020-02-26'
      }
    ])
  })

  afterEach(() => {
    getPosts.mockReset()
  })

  describe('on initialization', () => {
    it('should fetch and show all existing posts', async () => {
      let postsListElement = getDOM()
      initPostsList(postsListElement)

      await wait(() => {
        expect(getByText(postsListElement, 'this is an existing post')).toBeDefined()
      })
    })
  })
  describe('when adding a post', () => {
    it('should add the post to the list', () => {
      let postsListElement = getDOM()
      let postsList = initPostsList(postsListElement)
      let post = {
        id: '1234',
        date: '2020-02-26',
        author: 'drazik',
        content: 'Something interesting'
      }
      postsList.add(post)

      expect(getByText(postsListElement, 'drazik')).toBeDefined()
      expect(getByText(postsListElement, '2/26/2020')).toBeDefined()
      expect(getByText(postsListElement, 'Something interesting')).toBeDefined()
    })
  })
})
