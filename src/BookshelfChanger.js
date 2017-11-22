import React from 'react'

const BookshelfChanger = (props) => {
  const defaultBookshelf = props.bookshelfs.find((bookshelf) => bookshelf.key === props.bookshelf.key) ? props.bookshelf.key : 'none';
  return(
    <div className="book-shelf-changer">
      <select 
        defaultValue={defaultBookshelf}
        onChange={(event) => props.onMoveBook(event.target.value, props.bookshelf, props.book)}>
        <option value="none" disabled>Move to...</option>
        {props.bookshelfs.map((bookshelf) => (
          <option key={bookshelf.key} value={bookshelf.key}>{bookshelf.title}</option>
        ))}
      </select>
    </div>
  )
}

export default BookshelfChanger
