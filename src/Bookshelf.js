import React from 'react'
import Book from './Book'

const Bookshelf = (props) => (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.bookshelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((book, index) => (
            <li key={book.title || index}>
              <Book
                book={book}
                bookshelfs={props.bookshelfs}
                bookshelf={props.bookshelf}
                onMoveBook={props.onMoveBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
)

export default Bookshelf
