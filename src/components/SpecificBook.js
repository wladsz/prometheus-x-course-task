import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useBooks } from '../contexts/BooksContext';
import { useCart } from '../contexts/CartContext';

export default function SpecificBook () {
    const [count, setCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    const {bookId} = useParams();
    const {cart, setCart} = useCart();
    const {books} = useBooks();
    const book = books?.find(book => book.id === Number.parseInt(bookId));
    const navigate = useNavigate();

    const addBookToCart = (id) => {
        let updatedCart;
        if (cart.find(item => item.id === id)) {
            updatedCart = cart.map(item => {
                return item.id === id ? {...item, count: count} : item;
            })
        } else {
            updatedCart = [...cart, {id: id, title: book.title, count: count, price: book.price, totalBookPrice: totalPrice}];
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    const inputChangeHandler = (value) => {
            if (/[0-9]+/.test(value)) {
                if (value < 1) {
                    setCount(1);
                } else if (value > 42) {
                    setCount(42);
                } else {
                    setCount(value);
                }
            }
    }

    useEffect(() => {
        setTotalPrice(() => Number.parseFloat((count * book.price).toFixed(2)));
    }, [count]);

    return (
        <section className="px-4 py-2">
            <div className="row row-cols-1 row-cols-md-3" id={bookId}>
                <div className="_book-image col-sm-6 col-md-4 col-xl-3 order-1">
                    <img src={book.image !== "" ? book.image : process.env.PUBLIC_URL + '/img/imageNotFound.png'} alt="book cover" />
                </div>
                <div className="col-sm-6 col-md-4 col-xl-6 order-2">
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>Level: {book.level}</p>
                    <p>Tags: {book.tags.map(tag => '#' + tag).join(' ')}</p>
                </div>
                <div className="col-md-12 col-lg-9 mt-4 order-3 order-md-4">
                    <p className="=">{book.description}</p>
                </div>
                <form className="col-md-4 col-xl-3 order-4 order-md-3 d-flex flex-column justify-content-around border py-3">
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between border-0">
                            <span>Price, $</span>
                            <span>{book.price}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                            <label htmlFor="count">Count</label>
                            <div className="input-group w-50">
                                <button
                                    type="button"
                                    data-testid="decrease-button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => inputChangeHandler(count - 1)}
                                >
                                    -
                                </button>
                                <input
                                    id="count"
                                    data-testid="input"
                                    className="_input-textfield form-control text-center"
                                    type="number"
                                    min="1"
                                    value={count}
                                    max="42"
                                    onChange={(e) => inputChangeHandler(Number.parseInt(e.target.value))}
                                />
                                <button
                                    type="button"
                                    data-testid="increase-button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => {inputChangeHandler(count + 1)}}
                                >
                                    +
                                </button>
                            </div>
                        </li>
                        <li className="list-group-item d-flex justify-content-between border-0">
                            <span>Total price, $</span>
                            <span data-testid="total-price">{totalPrice}</span>
                        </li>
                    </ul>
                    <div className="d-flex justify-content-around">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('../booklist')}
                        >
                            Back to books
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => addBookToCart(bookId)}
                        >
                            Add to cart
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}