import styles from './style.module.scss'

const ShowMoreBtn = ({showMore}) => {
    return (
      <button 
        className={styles.button} 
        type="button"
        onClick={showMore}
      >
        Load more
      </button>
    )
}

export default ShowMoreBtn