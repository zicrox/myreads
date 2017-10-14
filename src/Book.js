import React from 'react'
import BookshelfChanger from './BookshelfChanger'

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={props.book.cover}></div>
      <BookshelfChanger bookshelfs={props.bookshelfs} bookshelf={props.bookshelf} />
    </div>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">{props.book.authors}</div>
  </div>
)

export default Book
