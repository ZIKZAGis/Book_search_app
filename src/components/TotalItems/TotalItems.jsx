import styles from './style.module.scss'

const TotalItems = ({books}) => {
    return (
        <div className={styles.total}>
          {`Found ${books.totalItems} results`}
        </div> 
    )
}

export default TotalItems