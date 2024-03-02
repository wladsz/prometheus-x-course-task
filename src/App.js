import { useState, useEffect } from 'react';
import RouteList from './routes/RouteList';
import { UserContextProvider } from './contexts/UserContext';
import { BooksContextProvider } from './contexts/BooksContext';
import { CartContextProvider } from './contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [books, setBooks] = useState();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    fetch('../books.json')
      .then((response) => response.json())
      .then((obj) => setBooks(Object.values(obj)[0]));
  }, []);

  return (
    <UserContextProvider value={{ user, setUser }}>
      <BooksContextProvider value={{books}}>
        <CartContextProvider value={{cart, setCart}}>
          <RouteList />
        </CartContextProvider>
      </BooksContextProvider>
    </UserContextProvider>
  );
}
