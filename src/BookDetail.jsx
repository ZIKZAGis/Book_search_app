import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BookService } from "./services/book.services"
import { Link } from "react-router-dom"

const BookDetail = () => {
    const {id} = useParams()
    const [book, setBook] = useState({})

    useEffect(() => {
        if(!id) return

        const fetchData = async (id) => {
            const data = await BookService.getById(id)
            console.log(data)
            setBook(data)
        }

        fetchData(id)

    }, [id])

    if(!book) return <p>Loading...</p>
    
    return (
        <>
            <Link to='/'>Back</Link>
            <div>Идентификатор: {book.id}</div>
        </>
    )
}

export default BookDetail