import axios from "axios";

export const BookService ={
    async getById(id) {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?`)
        return response.data
    }
}