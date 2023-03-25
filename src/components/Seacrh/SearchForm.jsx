const SearchForm = ({submit, change, changeCategory, changeSorting}) => {
  return (
        <>
            <form onSubmit={submit}>
                <div className="flex w-full border-2 border-cyan-300 rounded-md mb-5">
                    <input
                        className="w-full p-3 bg-transparent outline-none text-white"
                        onChange={change} 
                        type="text"
                        id="book"
                        placeholder="Search for books..."
                    />
                    <button className="p-3 text-white" type="submit">Search</button>
                </div>
                <div className="mb-5 flex">
                    <div className="mr-10">
                        <span className="mr-2 text-white">category:</span>
                        <select 
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
                        <span className="mr-2 text-white">sortyng by:</span>
                        <select 
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