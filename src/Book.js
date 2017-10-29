import React from 'react'
import BookshelfChanger from './BookshelfChanger'

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={props.book.cover}></div>
      <BookshelfChanger
        bookshelfs={props.bookshelfs}
        bookshelf={props.bookshelf}
        book={props.book}
        onMoveBook={props.onMoveBook} />
    </div>
    <div className="book-title">{props.book.title}</div>
    {props.book.authors.map((author) => (
      <div className="book-authors" key={author}>{author}</div>
    ))}
  </div>
)

export default Book
