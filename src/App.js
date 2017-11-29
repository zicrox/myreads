import React from 'react'
import { Link, Route } from 'react-router-dom'
import debounce from 'lodash/debounce'
import initState from './initState'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = initState;

  moveBook = (bookshelfDestiny, bookshelf, shelfFound, book) => {
    // Remove from no search bookshelf
    if (bookshelf.key !== 'searchResults') {
      this.setState((state) => ({
        [bookshelf.key]: state[bookshelf.key].filter((b) => b.title !== book.title)
      }));
    }
    // Remove from search bookshelf
    if (bookshelf.key === 'searchResults' && shelfFound !== 'none') {
      this.setState((state) => ({
        [shelfFound]: state[shelfFound].filter((b) => b.title !== book.title)
      }));
    }
    // Add
    if (bookshelfDestiny !== 'none') {
      this.setState((state) => ({
        [bookshelfDestiny]: state[bookshelfDestiny].concat(book)
      }));
    }
    BooksAPI.update(book, bookshelfDestiny).then((update) => {
      console.log("BooksAPI.update:");
      console.log(update);
    });
  }
  
  searchBook = (query) => {
    // Update input value
    this.setState({
      searchQuery: query.trim(),
      searchStatus: 'Searching...',
      searchResults: []
    });
    if(!query){
      return;
    }
    // Call debounce search 
    this._debounceSearchBook(query)
  }
  
  // Private method for "searchBook" with "debounce"
  _debounceSearchBook = debounce((query) => {
    BooksAPI.search(query, 20).then((books) => {
      console.log("BooksAPI.search: "+query);
      const bookFilter = books.map((book) => {
        const defaultCover = 'http://librosebooks.org/img/xggS7:XXBBB.vVq0xE.W8C.ClXCi0EVXWVgVu8vXS180jWgXWVWxiXtXECVviXc9nl9nnXF0aP3iVkcc9290n30Mi9ak302PtcMiF9XEXCXECVvi_ttM9_t_tMcF29.fSv.png'
        const coverImage = book.imageLinks ? book.imageLinks.thumbnail : defaultCover;
        const bookReformat = {
          id: book.id,
          title: book.title, 
          authors: book.authors || [], 
          cover: {
            "width": 128,
            "height": 192,
            "backgroundImage": "url("+coverImage+")"
          }
        }
        return bookReformat;
      })
      this.setState({ 'searchResults': bookFilter });
    }).catch((err) => {
      this.setState({ searchResults: [], searchStatus: 'No results' });
    });
  },300);
  
  searchShelf = (bookId) => {
    let shelfFound = 'none';
    if (bookId) {
      this.state.bookshelfs
        .filter((bookshelf) => bookshelf.key !== 'searchResults' && bookshelf.key !== 'none')
        .forEach((bookshelf) => {
          if(this.state[bookshelf.key].find((book) => book.id === bookId)){
            shelfFound = bookshelf.key
          }
        });
    }
    return shelfFound;
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
        this.setState({ [bookshelf.key]: bookFilter }) 
      });
    });  
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              {this.state.bookshelfs
                .filter((bookshelf) => bookshelf.key !== 'searchResults' && bookshelf.key !== 'none')
                .map((bookshelf) => (
                <Bookshelf key={bookshelf.key}
                  books={this.state[bookshelf.key]}
                  bookshelfs={this.state.bookshelfs.filter((bookshelf) => bookshelf.key !== 'searchResults')}
                  bookshelf={bookshelf}
                  onMoveBook={this.moveBook}
                  onSearchShelf={this.searchShelf}
                />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
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
                <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.searchQuery}
                  onChange={(event) => this.searchBook(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              {this.state.searchResults.length !== 0 ?
                this.state.bookshelfs
                .filter((bookshelf) => bookshelf.key === 'searchResults')
                .map((bookshelf) => (
                <Bookshelf key={bookshelf.key}
                  books={this.state[bookshelf.key]}
                  bookshelfs={this.state.bookshelfs.filter((bookshelf) => bookshelf.key !== 'searchResults')}
                  bookshelf={bookshelf}
                  onMoveBook={this.moveBook}
                  onSearchShelf={this.searchShelf}
                />
              )) : this.state.searchQuery !== "" && 
              <h2>{this.state.searchStatus}</h2>}
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
