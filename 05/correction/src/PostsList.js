import React from 'react'

export function PostsList(props) {
  return (
    <div className="posts stack stack--large js-posts-list">
      {props.posts.map(post => {
        return (
          <article key={post.id} id={post.id} className="post stack stack--large">
            <header className="post__header">
              <div className="post__author">{post.author}</div>
              <time dateTime={post.date} className="post__date">
                {new Date(post.date).toLocaleDateString("fr-FR")}
              </time>
            </header>
            <div>{post.content}</div>
          </article>
        )
      })}
    </div>
  )
}
