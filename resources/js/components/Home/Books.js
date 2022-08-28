import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBooks } from './BooksSlice'
import { fetchBook } from './ModalSlice'
function Books() {
    const products = useSelector(state => state.books.products)
    const isLoading = useSelector(state => state.books.isLoading)
    const { current_page, last_page } = useSelector(state => { return { current_page: state.books.current_page, last_page: state.books.last_page } })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBooks())
    }, [])

    return (
        <section>
            <h4 className="display-6 mt-4 mb-4 text-center">Our Books</h4>
            {true == isLoading && <div className='text-center d-flex justify-content-center align-items-center'>
                <div className="spinner-grow" role="status"></div>
                <div className='ml-8'>Loading...</div>
            </div>}

            <div className='book-container'>
                {products.length > 0 && products.map(book => {
                    return <div key={book.id} className='book d-flex flex-column justify-content-around'>
                        <img src={"/api/books/" +book.id +"/image"} alt={book.title} />
                        <div className='title' title={book.title}>{book.title}</div>
                        <div className='authors'>{book.authors.join(', ')}</div>
                        <div className='year'>{book.publication_date.replace(' 00:00:00', '')}</div>
                        <button className="btn buy-now btn-block" onClick={() => { dispatch(fetchBook(book.id)) }}>Buy Now</button>
                    </div>
                })}

            </div>
            <div className="d-flex justify-content-end mt-4">
                <ul className="pagination">
                    {current_page > 1 && <li className="page-item"><a className="page-link" href="#">Previous</a></li>}
                    {current_page != last_page && <li className="page-item"><a className="page-link" href="#" onClick={(e) => { e.preventDefault(); dispatch(fetchBooks(current_page + 1)) }}>Next</a></li>}
                </ul>
            </div>
        </section>
    )
}

export default Books