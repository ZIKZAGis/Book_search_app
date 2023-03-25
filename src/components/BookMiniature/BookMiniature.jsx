import { Link } from "react-router-dom"
import styles from './style.module.scss'

const BookMiniature = ({book}, key) => {
    return (
      <div className={styles.miniature} key={key}>
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
    )
}

export default BookMiniature