
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="/">
          Book<span>Finder</span>
        </a>

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
            მოძებნე წიგნები, აღმოაჩინე ავტორები
            და იპოვე ახალი ისტორიები.
          </p>

          <form className="search-form">
            <input
              type="search"
              placeholder="შეიყვანე წიგნის ან ავტორის სახელი..."
              aria-label="წიგნის ან ავტორის ძიება"
            />
            <button type="button">ძიება</button>
          </form>
        </section>

        <section className="books-section" id="books">
          <div className="section-heading">
            <div>
              <p className="eyebrow">წიგნების კოლექცია</p>
              <h2>პოპულარული წიგნები</h2>
            </div>
          </div>

          <div className="books-grid">
            {/* წიგნების ბარათები დაემატება შემდეგ ეტაპზე */}
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="/">
          Book<span>Finder</span>
        </a>
        <p>იპოვე შენი შემდეგი საყვარელი წიგნი.</p>
      </footer>
    </div>
  )
}

export default App
