import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BookService } from "../../services/book.services"
import { Link } from "react-router-dom"
import { MdArrowBackIos } from 'react-icons/md'
import styles from './style.module.scss'

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
                <div className={styles.detail}>
                    <div className={styles.wrapper}>
                        <Link className={styles.arrow} to='/'>
                            <MdArrowBackIos size={40}/>
                        </Link>
                        <div className={styles.detail_container}>
                            <div className={styles.img_container}>
                                <img 
                                    className={styles.img} 
                                    src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://i.pinimg.com/originals/aa/b0/dd/aab0dd7a13205ce05bff5ea2f2db866a.jpg'} 
                                    alt={book.volumeInfo.title} 
                                    width={300}
                                    height={500}
                                />
                            </div>
                            <div>
                                {!!book.volumeInfo.title && <h1 className={styles.title}>{book.volumeInfo.title}</h1>}
                                {!!book.volumeInfo.categories && <p className={styles.category}>{book.volumeInfo.categories.join(' / ')}</p>}
                                {!!book.volumeInfo.authors && <p className={styles.author}>{book.volumeInfo.authors.join(', ')}</p>}
                                {!!book.volumeInfo.description && <div className={styles.description} dangerouslySetInnerHTML={{__html: book.volumeInfo.description}}></div>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default BookDetail