import React from 'react'
import BookshelfChanger from './BookshelfChanger'

const Book = (props) => (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={props.bookData.cover}></div>
      <BookshelfChanger bookshelfs={props.bookshelfs} bookshelfIndex={props.bookshelfIndex}/>
    </div>
    <div className="book-title">{props.bookData.title}</div>
    <div className="book-authors">{props.bookData.authors}</div>
  </div>
)

export default Book
