import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BookService } from "../../services/book.services"
import { Link } from "react-router-dom"
import { MdArrowBackIos } from 'react-icons/md'

const BookDetail = () => {
    const {id} = useParams()
    const [book, setBook] = useState({})

    useEffect(() => {
        if(!id) return

        const fetchData = async (id) => {
            const data = await BookService.getById(id)
            setBook(data)
        }

        fetchData(id)

    }, [id])

    if(!book) return <p>Loading...</p>
    
    return (
        <>
            {book.volumeInfo && 
                <div className="bg-slate-600 p-10 min-h-screen">
                    <Link className="block mb-5" to='/'>
                        <MdArrowBackIos size={40}/>
                    </Link>
                    <div className="flex">
                        <div className="p-10 bg-slate-500 mr-10 w-1/4 rounded-xl">
                            <img 
                                className="block mx-auto shadow-2xl drop-shadow-xl" 
                                src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://i.pinimg.com/originals/aa/b0/dd/aab0dd7a13205ce05bff5ea2f2db866a.jpg'} 
                                alt={book.volumeInfo.title} 
                                width={300}
                                height={500}
                            />
                        </div>
                    <div className="w-3/4">
                        {book.volumeInfo.categories && <div className="text-zinc-300 text-xm mb-2">{book.volumeInfo.categories.join(' / ')}</div>}
                        {book.volumeInfo.title && <h1 className="text-2xl mb-5 text-white font-bold">{book.volumeInfo.title}</h1>}
                        {book.volumeInfo.authors && <p className="text-zinc-300 text-sm underline mb-5">{book.volumeInfo.authors.join(', ')}</p>}
                        {book.volumeInfo.description && <div className="text-white text-lg border-2 rounded-xl p-3">{book.volumeInfo.description}</div>}
                    </div>
                </div>
                </div>
            }
        </>
    )
}

export default BookDetail