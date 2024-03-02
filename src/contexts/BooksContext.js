import { createContext, useContext } from "react";

const BooksContext = createContext();
const BooksContextProvider = BooksContext.Provider;
const useBooks = () => useContext(BooksContext);

export {BooksContextProvider, useBooks};