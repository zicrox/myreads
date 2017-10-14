import React from 'react'
import Book from './Book'

const Bookshelf = (props) => (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.bookshelfs[props.index]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.bookDataArr.map((bookData) => (
            <li key={bookData.title}>
              <Book bookData={bookData} bookshelfs={props.bookshelfs} bookshelfIndex={props.index} />
            </li>
          ))}
        </ol>
      </div>
    </div>
)

export default Bookshelf
