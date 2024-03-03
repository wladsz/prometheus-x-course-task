import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Cart () {
    const {cart, setCart} = useCart();
    const [total, setTotal] = useState(0);
    const [isDisabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const updateCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
    const deleteItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        updateCart(updatedCart);
    }

    useEffect(() => {
        cart.length === 0 ? setDisabled(true) : setDisabled(false);
        setTotal(() => {
            return cart.reduce((sum, book) => sum += book.totalBookPrice, 0);
        })
    }, [cart]);

    return (
        <>
            <div className="d-flex justify-content-between my-3">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('../booklist')}
                >
                    Back to books
                </button>        
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => updateCart([])}
                    disabled={isDisabled}
                >
                    Purchase
                </button> 
            </div>
                {cart.length !== 0 ? 
                    <>
                        <ul className="list-group">
                            {cart.map(item => {
                                const {title, count, totalBookPrice, id} = item;
                                return (
                                    <li className="list-group-item row">
                                        <div className="d-inline-block row col col-sm-9 text-center text-sm-start">
                                            <span
                                                className="d-inline-block col-6 align-top fw-bold"
                                                onClick={() => navigate(`../book/${id}`)}
                                            >
                                                {title}
                                            </span>
                                            <span className="d-inline-block col-6 align-top">Items: {count}</span>
                                        </div>
                                        <div className="d-inline-block row col col-sm-3 text-center text-sm-end">
                                            <span
                                                className="d-inline-block col-6 align-top"
                                                id="cart-delete-item"
                                                onClick={() => deleteItem(id)}
                                            >
                                                <img src={process.env.PUBLIC_URL + "/img/trash.svg"} alt="delete item"/>
                                            </span>
                                            <span className="d-inline-block col-6 align-top">${totalBookPrice.toFixed(2)}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        <p className="fw-bold text-end">Total price, $<span>{total.toFixed(2)}</span></p>
                    </>
                    :
                    <div className="d-flex justify-content-center align-items-center h-100 text-center">
                        <div>
                            <img src={process.env.PUBLIC_URL + "/img/cart.svg"} alt="empty cart" id="cart-image" />
                            <p>Cart is empty</p>
                        </div>
                    </div>
                }
        </>
    );
}