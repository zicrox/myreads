import React from 'react'

const BookshelfChanger = (props) => (
  <div className="book-shelf-changer">
    <select defaultValue={props.bookshelfs[props.bookshelfIndex]}>
      <option value="none" disabled>Move to...</option>
      <option value={props.bookshelfs[0]}>Currently Reading</option>
      <option value={props.bookshelfs[1]}>Want to Read</option>
      <option value={props.bookshelfs[2]}>Read</option>
      <option value="none">None</option>
    </select>
  </div>
)

export default BookshelfChanger
