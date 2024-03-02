import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function Header () {
    const {user, setUser} = useUser();
    const navigate = useNavigate();
    const signOut = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('cart');
        navigate("/signin");
    };

    return (
        <header className="px-4">
            <nav className="navbar navbar-expand-sm border-bottom row my-1">
                <div className="d-flex justify-content-between col-sm-4 ms-3">
                    <a href="#" className="navbar-brand d-flex align-items-center">JS Band Store / Vlad Šalimov</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div id="navbarSupportedContent" className="collapse navbar-collapse justify-content-end col-6 me-3">
                    {user !== null ?
                        <ul className="navbar-nav d-flex align-items-center">
                            <li className="nav-item mx-1">
                                <Link to="/cart" >
                                    <img src="../img/cart.svg" alt="cart" id="cart-icon"/>
                                </Link>
                            </li>
                            <li className="nav-item mx-1">
                                <button 
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={signOut}>
                                    Sign out
                                </button>
                            </li>
                            <img src="../img/avatar.png" alt="avatar" id="avatar" className="border rounded-circle mx-1"/>
                            <span className="mx-1 fw-bold">{user}</span>
                        </ul>
                    : null}
                </div>
            </nav>
        </header>
    );
}