import styles from './style.module.scss'
import { GoSearch } from 'react-icons/go'

const SearchForm = ({submit, change, changeCategory, changeSorting}) => {
  return (
        <>
            <form onSubmit={submit}>
                <div className={styles.search}>
                    <input
                        className={styles.input}
                        onChange={change} 
                        type="text"
                        id="book"
                        placeholder="Search for books..."
                    />
                    <button className={styles.button} type="submit">
                        <GoSearch size={20}/>
                    </button>
                </div>
                <div className={styles.select_field}>
                    <div>
                        <span>Category:</span>
                        <select 
                            className={styles.select}
                            name="category" 
                            id="1"
                            onChange={changeCategory}
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
                        <span>Sortyng by:</span>
                        <select 
                            className={styles.select}
                            name="sorting" 
                            id="2"
                            onChange={changeSorting}
                        >
                            <option value="relevance" defaultValue>relevance</option>
                            <option value="newest">newest</option>
                        </select>
                    </div>
                </div>
            </form>
        </>
    )
}

export default SearchForm