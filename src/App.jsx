import { useEffect, useState } from "react";

const KEY_API = 'AIzaSyAEarQTsRJWBbtcx-Z8o57eMtMDBLO_nTA'
let search;

const App = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search ? search: 'all'}&key=${KEY_API}`)
      const data = await response.json()

      setBooks(data)
    }

    fetchData()
  }, [])

  console.log(books)

  const handleChange = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <h1>Book Search App</h1>
      <div>
        <form onSubmit={handleChange}>
          <div>
            <input
              onChange={handleChange} 
              type="text"
              id="book"
              placeholder="Search for books..."
            />
            <button type="submit">Search</button>
          </div>
          <div>
            <select name="category" id="1">
                <option value="all" defaultChecked>all</option>
                <option value="art">art</option>
                <option value="biography">biography</option>
                <option value="computers">computers</option>
                <option value="history">history</option>
                <option value="medical">medical</option>
                <option value="poetry">poetry</option>
              </select>
              <select name="sorting" id="2">
                <option value="relevance" defaultChecked>relevance</option>
                <option value="newest">newest</option>
              </select>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;

