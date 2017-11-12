import React from 'react'
import { Link, Route } from 'react-router-dom'
import initState from './initState'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = initState;

  moveBook = (event, bookshelf, book) => {
    const bookshelfDestiny = event.target.value;
    this.setState((state) => ({
      // Add
      //[bookshelfDestiny]: [...state[bookshelfDestiny], book]
      [bookshelfDestiny]: state[bookshelfDestiny].concat(book),
      // Remove
      [bookshelf.key]: state[bookshelf.key].filter((b) => b.title !== book.title)
    }));
    BooksAPI.update(book, bookshelfDestiny).then((update) => {
      console.log("BooksAPI.update:");
      console.log(update);
    });
  }
  
  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      // Format api response
      console.log("BooksAPI.getAll:");
      this.state.bookshelfs.forEach((bookshelf) => {
        const bookFilter = books.filter((book) => book.shelf === bookshelf.key).map((book) => {
          const bookReformat = {
            id: book.id,
            title: book.title, 
            authors: book.authors, 
            cover: {
              "width": 128,
              "height": 192,
              "backgroundImage": "url("+book.imageLinks.thumbnail+")"
            }
          }
          return bookReformat;
        });
        console.log({ [bookshelf.key]: bookFilter });
        this.setState({ [bookshelf.key]: bookFilter }) 
      });
    });  
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {this.state.bookshelfs.map((bookshelf) => (
                <Bookshelf key={bookshelf.key}
                  books={this.state[bookshelf.key]}
                  bookshelfs={this.state.bookshelfs}
                  bookshelf={bookshelf}
                  onMoveBook={this.moveBook}
                />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
