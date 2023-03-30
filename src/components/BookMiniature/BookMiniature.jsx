import { Link } from "react-router-dom"
import styles from './style.module.scss'

const BookMiniature = ({book}, key) => {
  return (
    <Link to={`/book/${book.id}`} className={styles.miniature} key={key}>
      <img
        className={styles.img}
        src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://i.pinimg.com/originals/aa/b0/dd/aab0dd7a13205ce05bff5ea2f2db866a.jpg'} 
        alt={book.volumeInfo.title} width={150}
      />
      {book.volumeInfo.categories && <div className={styles.category}>{book.volumeInfo.categories[0]}</div>}
      <h2 className={styles.title}>{book.volumeInfo.title}</h2>
      {book.volumeInfo.authors && <p className={styles.author}>{book.volumeInfo.authors.join(', ')}</p>}
    </Link>

  )
}

export default BookMiniature