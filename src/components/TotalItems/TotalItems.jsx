const TotalItems = ({books}) => {
    return (
        <div className="text-center text-cyan-300 font-bold mb-5">
          {!!books.totalItems ? `Found ${books.totalItems} results` : `Result not found`}
        </div> 
    )
}

export default TotalItems