export default {
  /**
   * TODO: Instead of using this state variable to keep track of which page
   * we're on, use the URL in the browser's address bar. This will ensure that
   * users can use the browser's back and forward buttons to navigate between
   * pages, as well as provide a good URL they can bookmark and share.
   */
  showSearchPage: false,

  bookshelfs: [
    {
      "title":"Currently Reading",
      "key":"currentlyReading"
    },
    {
      "title":"Want to Read",
      "key":"wantToRead"
    },
    {
      "title":"Read",
      "key":"read"
    }
  ],

  currentlyReading: [
    {
      "cover": {
        "width": 128,
        "height": 193,
        "backgroundImage": 'url("https://icons8.com/preloaders/img/favicons/favicon-194x194.png")'
      },
      "title": "",
      "authors": [""]
    },
    {
      "cover": {
        "width": 128,
        "height": 193,
        "backgroundImage": 'url("https://icons8.com/preloaders/img/favicons/favicon-194x194.png")'
      },
      "title": "",
      "authors": [""]
    }
  ],

  wantToRead: [
    {
      "cover": {
        "width": 128,
        "height": 193,
        "backgroundImage": 'url("https://icons8.com/preloaders/img/favicons/favicon-194x194.png")'
      },
      "title": "",
      "authors": [""]
    },
    {
      "cover": {
        "width": 128,
        "height": 193,
        "backgroundImage": 'url("https://icons8.com/preloaders/img/favicons/favicon-194x194.png")'
      },
      "title": "",
      "authors": [""]
    }
  ],

  read: [
    {
      "cover": {
        "width": 128,
        "height": 193,
        "backgroundImage": 'url("https://icons8.com/preloaders/img/favicons/favicon-194x194.png")'
      },
      "title": "",
      "authors": [""]
    },
    {
      "cover": {
        "width": 128,
        "height": 193,
        "backgroundImage": 'url("https://icons8.com/preloaders/img/favicons/favicon-194x194.png")'
      },
      "title": "",
      "authors": [""]
    }
  ]
}
