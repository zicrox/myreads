import React from 'react'

const BookshelfChanger = (props) => (
  <div className="book-shelf-changer">
    <select defaultValue={props.bookshelf.key}>
      <option value="none" disabled>Move to...</option>
      {props.bookshelfs.map((bookshelf) => (
        <option key={bookshelf.key} value={bookshelf.key}>{bookshelf.title}</option>
      ))}
      <option value="none">None</option>
    </select>
  </div>
)

export default BookshelfChanger
