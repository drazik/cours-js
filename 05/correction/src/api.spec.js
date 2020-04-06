import {
  getPosts,
  createPost,
  deletePost,
  createComment,
  deleteComment,
  BASE_URL
} from './api.js'

let mockSuccessResponse = {}
let mockJsonPromise = Promise.resolve(mockSuccessResponse)
let mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise
})

beforeEach(() => {
  window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
})

afterEach(() => {
  window.fetch.mockReset()
})

describe('getPosts', () => {
  it('should do a GET request on /posts', async () => {
    await getPosts()

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/posts`)
  })

  it('should return the list of posts', async () => {
    let expectedPosts = [
      {
        id: '1',
        author: 'somebody',
        content: "It's sunny today! Like it xoxo"
      },
      {
        id: '2',
        author: 'somebody',
        content: 'Hello world!!!'
      }
    ]

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(expectedPosts)
    }))

    let posts = await getPosts()

    expect(posts).toEqual(expectedPosts)
  })
})

describe('createPost', () => {
  it('should do a POST request on /posts', async () => {
    let post = { author: 'somebody', content: 'Very interesting thing' }

    await createPost(post)

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
  })

  it('should return the created post', async () => {
    let post = { author: 'somebody', content: 'Very interesting thing' }
    let expectedPost = { ...post, id: '1' }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(expectedPost)
    }))

    let createdPost = await createPost(post)

    expect(createdPost).toEqual(expectedPost)
  })

  describe('when the server returns an error', () => {
    it('should throw an error with the message returned by the server', async () => {
      let post = { author: 'somebody', content: 'Very interesting thing' }

      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ message: 'title and content are required' })
      }))

      await expect(createPost(post)).rejects.toThrow('title and content are required')
    })
  })
})

describe('deletePost', () => {
  it('should do a DELETE request on /posts', async () => {
    let post = {
      id: '1',
      author: 'somebody',
      content: 'Very interesting thing'
    }

    await deletePost(post)

    expect(window.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/posts/1`,
      { method: 'DELETE' }
    )
  })
})

describe('createComment', () => {
  it('should do a POST request on /posts/:idPost/comments', async () => {
    let post = { id: '1' }
    let comment = { author: 'somebody', content: 'Comment content' }
    await createComment(post, comment)

    expect(window.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/posts/1/comments`,
      {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: { "Content-Type": "application/json" }
      }
    )
  })

  it('should return the created comment', async () => {
    let post = { id: '1' }
    let comment = { author: 'somebody', content: 'Comment content' }
    let expectedComment = { ...comment, id: '1' }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(expectedComment)
    }))

    let createdComment = await createComment(post, comment)

    expect(createdComment).toEqual(expectedComment)
  })
})

describe('deletePost', () => {
  it('should do a DELETE request on /posts/:idPost/comments/:idComment', async () => {
    let post = { id: '1' }
    let comment = { id: '1' }
    await deleteComment(post, comment)

    expect(window.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/posts/1/comments/1`,
      { method: 'DELETE' }
    )
  })
})
