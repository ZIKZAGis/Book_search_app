import styles from './style.module.scss'

const TotalItems = ({total}) => {
    return (
        <div className={styles.total}>
          {`Found ${total} results`}
        </div> 
    )
}

export default TotalItems