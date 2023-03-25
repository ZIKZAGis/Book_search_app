import { useState } from "react";
import axios from 'axios'
import SearchForm from "../Seacrh/SearchForm";
import BookMiniature from "../BookMiniature/BookMiniature";
import TotalItems from "../TotalItems/TotalItems";
import ShowMoreBtn from "../ShowMore/ShowMoreBtn";

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
        <SearchForm
          submit={handleSubmit}
          change={handleChange}
          changeCategory={handleChangeCategory}
          changeSorting={handleChangeSorting}
        />
      </div>
      {books.totalItems && <TotalItems books={books} />}
      {result && 
        <div className="grid grid-cols-4 gap-10 mb-10">
          {result.map(book => (
            <BookMiniature book={book} key={book.id} />
          ))}
      </div>
      }
      {books.totalItems > 30 & books.totalItems >= startindex ?  
        <ShowMoreBtn showMore={handleMore} />
        : ''
      }
    </div>
  );
}

export default App;

