import { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const KEY_API = '&key=AIzaSyAEarQTsRJWBbtcx-Z8o57eMtMDBLO_nTA'

const App = () => {
  const [searchString, setSearchString] = useState('')
  const [category, setCategory] = useState('')
  const [sorting, setSorting] = useState('&orderBy=relevance')
  const [books, setBooks] = useState([])
  const [result, setResult] = useState([])
  const [startindex, setStartIndex] = useState(31)

  const handleChange = (e) => {
    const searchValue = e.target.value
    setSearchString(searchValue)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (searchString.length > 0) {
      const data = await axios.get
        (`https://www.googleapis.com/books/v1/volumes?q=${searchString}${category}${sorting}${KEY_API}&maxResults=30`)
        .catch(err => console.log(err))
      setResult(data.data.items)
      setBooks(data.data)
    }
  }

  const handleChangeCategory = (e) => {
    const categooryCheck = e.target.value
    setCategory(categooryCheck.length > 0 ? `+subject:${categooryCheck}` : '')
  }

  const handleChangeSorting = (e) => {
    const sortingCheck = e.target.value
    setSorting(`&orderBy=${sortingCheck}`)
  }

  const handleMore = async () => {
    const data = await axios.get
      (`https://www.googleapis.com/books/v1/volumes?q=${searchString}${category}${sorting}${KEY_API}&maxResults=30&startIndex=${startindex}`)
      .catch(err => console.log(err))
    const moreResult = [...result, ...data.data.items]
    setResult(moreResult)
    setStartIndex(startindex + 30)
  }

  return (
    <div className="bg-slate-600 p-10 min-h-screen">
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
              <select 
                name="category" 
                id="1"
                onChange={handleChangeCategory}
              >
                <option value="" defaultValue>all</option>
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
              <select 
                name="sorting" 
                id="2"
                onChange={handleChangeSorting}
              >
                <option value="relevance" defaultValue>relevance</option>
                <option value="newest">newest</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      {books.totalItems &&
        <div className="text-center text-cyan-300 font-bold mb-5">
          {!!books.totalItems ? `Found ${books.totalItems} results` : `Result not found`}
        </div> 
      }
      {result && 
        <div className="grid grid-cols-4 gap-10 mb-10">
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
      }
      {books.totalItems > 30 & books.totalItems >= startindex ?  
        <button 
          className="text-white font-bold border-2 rounded-xl px-4 py-2" 
          type="button"
          onClick={handleMore}
        >
          Load more
        </button>
        : ''
      }
    </div>
  );
}

export default App;

