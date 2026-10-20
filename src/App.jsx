
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const requestId = useRef(0)

  async function searchBooks(query = '') {
    const currentRequest = ++requestId.current

    setLoading(true)
    setError('')

    try {
      const url = query.trim()
        ? `https://openlibrary.org/search.json?q=${encodeURIComponent(query.trim())}&limit=24`
        : 'https://openlibrary.org/subjects/fiction.json?limit=24'

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('წიგნების ჩატვირთვა ვერ მოხერხდა.')
      }

      const data = await response.json()

      const results = query.trim()
        ? (data.docs || [])
        : (data.works || []).map((book) => ({
            ...book,
            cover_i: book.cover_id,
            author_name: (book.authors || []).map(
              (author) => author.name
            ),
          }))

      if (currentRequest === requestId.current) {
        setBooks(results)
      }
    } catch {
      if (currentRequest === requestId.current) {
        setError(
          'წიგნები ვერ ჩაიტვირთა. შეამოწმე ინტერნეტი და სცადე თავიდან.'
        )
        setBooks([])
      }
    } finally {
      if (currentRequest === requestId.current) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    searchBooks()

    return () => {
      requestId.current++
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    searchBooks(search)
  }

  function handleSearchChange(event) {
    const value = event.target.value
    setSearch(value)

    if (!value.trim()) {
      searchBooks('')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="/">Book<span>Finder</span></a>

        <nav>
          <a href="#home">მთავარი</a>
          <a href="#books">წიგნები</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="eyebrow">
            შენი შემდეგი საყვარელი წიგნი აქ არის
          </p>

          <h1>
            აღმოაჩინე შენი <span>შემდეგი წიგნი.</span>
          </h1>

          <p className="hero-description">
            მოძებნე წიგნები, აღმოაჩინე ავტორები და იპოვე ახალი ისტორიები.
          </p>

          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="შეიყვანე წიგნის ან ავტორის სახელი..."
              aria-label="წიგნის ან ავტორის ძიება"
            />

            <button type="submit" disabled={loading}>
              {loading ? 'იტვირთება...' : 'ძიება'}
            </button>
          </form>
        </section>

        <section className="books-section" id="books">
          <div className="section-heading">
            <div>
              <p className="eyebrow">წიგნების კოლექცია</p>
              <h2>
                {search.trim() ? 'ძიების შედეგები' : 'პოპულარული წიგნები'}
              </h2>
            </div>

            <span>{books.length} წიგნი</span>
          </div>

          {loading && (
            <p className="message">წიგნები იტვირთება...</p>
          )}

          {error && (
            <p className="message error">{error}</p>
          )}

          {!loading && !error && books.length === 0 && (
            <p className="message">
              წიგნები ვერ მოიძებნა. სცადე სხვა საძიებო სიტყვა.
            </p>
          )}

          <div className="books-grid">
            {books.map((book, index) => (
              <article className="book-card" key={book.key || index}>
                <div className="cover">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={`${book.title || 'წიგნი'} — ყდა`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="no-cover">
                      📚
                      <span>ყდა მიუწვდომელია</span>
                    </div>
                  )}
                </div>

                <div className="book-info">
                  <h3>{book.title || 'უსახელო წიგნი'}</h3>

                  <p>
                    {book.author_name?.join(', ') || 'უცნობი ავტორი'}
                  </p>

                  {book.first_publish_year && (
                    <span className="year">
                      {book.first_publish_year}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="/">Book<span>Finder</span></a>
        <p>იპოვე შენი შემდეგი საყვარელი წიგნი.</p>
      </footer>
    </div>
  )
}

export default App
