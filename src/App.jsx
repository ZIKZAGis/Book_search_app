import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const KEY_API = 'AIzaSyAEarQTsRJWBbtcx-Z8o57eMtMDBLO_nTA'

const App = () => {
  const [search, setSearch] = useState(' ')
  const [books, setBooks] = useState([])
  const [result, setResult] = useState([])

  useEffect(() => {
    console.log(books)
  }, [books])

  const handleChange = (e) => {
    const searchValue = e.target.value
    setSearch(searchValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${KEY_API}&maxResults=30`)
    setResult(data.data.items)
    setBooks(data.data)
  }

  return (
    <div className="bg-slate-600 p-10 min-h-screen">
      <div>
        <h1 className="text-xl mb-5 text-center text-cyan-300 font-bold">Book Search App</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="flex w-full border-2 border-cyan-300 rounded-md mb-5">
              <input
                className="w-full p-3 bg-transparent outline-none text-white"
                onChange={handleChange} 
                type="text"
                id="book"
                placeholder="Search for books..."
              />
              <button className="p-3 text-white" type="submit">Search</button>
            </div>
            <div className="mb-5 flex">
              <div className="mr-10">
                <span className="mr-2 text-white">category:</span>
                <select name="category" id="1">
                  <option value="all" defaultChecked>all</option>
                  <option value="art">art</option>
                  <option value="biography">biography</option>
                  <option value="computers">computers</option>
                  <option value="history">history</option>
                  <option value="medical">medical</option>
                  <option value="poetry">poetry</option>
                </select>
              </div>
              <div>
                <span className="mr-2 text-white">sortyng by:</span>
                <select name="sorting" id="2">
                  <option value="relevance" defaultChecked>relevance</option>
                  <option value="newest">newest</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="text-center text-cyan-300 font-bold mb-5">
          Found {!!books.totalItems ? books.totalItems : 0} results
        </div>
        <div className="grid grid-cols-4 gap-10">
          {result.map(book => (
            <div className="bg-slate-500 rounded-md w-full px-3 py-5" key={book.id}>
              <Link to={`/book/${book.id}`}>
                <img
                  className="block mx-auto object-cover shadow-2xl drop-shadow-xl mb-3"
                  src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://i.pinimg.com/originals/aa/b0/dd/aab0dd7a13205ce05bff5ea2f2db866a.jpg'} 
                  alt={book.volumeInfo.title} width={150}
                />
                {book.volumeInfo.categories && <div className="text-zinc-300 underline text-xs mb-2">{book.volumeInfo.categories[0]}</div>}
                <h2 className="text-base text-white font-semibold mb-2">{book.volumeInfo.title}</h2>
                {book.volumeInfo.authors && <p className="text-zinc-300 text-sm">{book.volumeInfo.authors.join(', ')}</p>}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

