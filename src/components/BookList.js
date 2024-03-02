import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooks } from '../contexts/BooksContext';

function Book ({book}) {
    const navigate = useNavigate();
    const {id, author, price, image, title} = book;

    return (
        <div className="col">
            <div className="_book card mx-auto my-2">
                <div className="_book-image mx-auto my-auto">
                    <img src={image !== "" ? image : '../img/imageNotFound.png'} alt="book cover" className="m-2"/>
                </div>
                <div className="card-body">
                    <p className="card-title fw-bold text-truncate">{title}</p>
                    <p className="card-text text-truncate">{author}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center p-4">
                    <span className="fw-bold">${price}</span>
                    <button
                        className="btn btn-outline-info"
                        type="button"
                        onClick={() => navigate(`/book/${id}`)}
                    >
                        View
                    </button>
                </div>
            </div>
        </div>
    );
}

function FilteredBooklist ({filter}) {
    const {books} = useBooks();
    const title = filter.get('title');
    const price = filter.getAll('price');

    if (books) {
        return (
            books
                .filter(book => {
                    return price.length < 2 ? book : book.price > price[0] && book.price < price[1];
                })
                .filter(book => {
                    return book.title.includes(title);
                })
                .map(book => {
                    return <Book book={book} />
            })
          );
    }
}

export default function BookList () {
    const [searchParams, setSearchParams] = useSearchParams();
    const [titleFilter, setTitleFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState([]);
    
    useEffect(() => {
        setSearchParams({'title': titleFilter, 'price': priceFilter});
    }, [titleFilter, priceFilter]);

    return (
        <>
            <section id="filter" className="my-3">
                <form className="row row-cols-auto mx-auto">
                    <div className="col col-12 col-sm-6 col-md-3">
                        <input
                            type="search"
                            className="form-control d-inline-block"
                            onChange={(e) => setTitleFilter(e.target.value)}
                            placeholder="Search by book name"
                        />
                    </div>
                    <div className="col col-12 col-sm-6 col-md-3">
                        <select className="form-select">
                            <option
                                label="All books"
                                onClick={() => setPriceFilter([])}
                                selected
                                ></option>
                            <option
                                label="0$ - 15$"
                                onClick={() => setPriceFilter([0, 15])}
                            ></option>
                            <option
                                label="15$ - 30$"
                                onClick={() => setPriceFilter([15, 30])}
                            ></option>
                            <option
                                label=" > 30$"
                                onClick={() => setPriceFilter([30, Infinity])}
                            ></option>
                        </select>
                    </div>   
                </form>
            </section>
            <section id="booklist" className="d-flex flex-wrap row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5">
                    <FilteredBooklist filter={searchParams}/>
            </section>
        </>
    );
}