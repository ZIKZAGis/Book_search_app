const ShowMoreBtn = ({showMore}) => {
    return (
      <button 
        className="text-white font-bold border-2 rounded-xl px-4 py-2" 
        type="button"
        onClick={showMore}
      >
        Load more
      </button>
    )
}

export default ShowMoreBtn