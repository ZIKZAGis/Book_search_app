import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from './App'
import BookDetail from './BookDetail'

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<App/>} path='/'/>
            <Route element={<BookDetail/>} path='/book/:id'/>
            <Route element={<div>Page not found...</div>} path='*'/>
        </Routes>
    </BrowserRouter>
}

export default Router