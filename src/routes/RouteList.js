import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import BookList from '../components/BookList';
import Cart from '../components/Cart';
import PageNotFound from '../components/PageNotFound';
import SignIn from "../components/SignIn";
import SpecificBook from '../components/SpecificBook';

export default function RouteList () {
    return (
        <Routes>
            <Route exact path="/" element={<Layout />}>
                <Route path="/" element={<SignIn />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/booklist" element={<BookList />}/>
                <Route path="/book/:bookId" element={<SpecificBook />}/>
                <Route path="/*" element={<PageNotFound />}/>
            </Route>
        </Routes>
    )
}