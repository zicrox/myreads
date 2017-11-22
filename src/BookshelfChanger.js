import React from 'react'

const BookshelfChanger = (props) => {
  const shelfFound = props.onSearchShelf(props.book.id);
  return(
    <div className="book-shelf-changer">
      <select 
        defaultValue={shelfFound}
        onChange={(event) => props.onMoveBook(event.target.value, props.bookshelf, shelfFound, props.book)}>
        <option value="none" disabled>Move to...</option>
        {props.bookshelfs.map((bookshelf) => (
          <option key={bookshelf.key} value={bookshelf.key}>{bookshelf.title}</option>
        ))}
      </select>
    </div>
  )
}

export default BookshelfChanger
