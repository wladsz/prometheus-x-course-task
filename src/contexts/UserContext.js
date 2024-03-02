import { createContext, useContext } from "react";

const UserContext = createContext();
const UserContextProvider = UserContext.Provider;
const useUser = () => useContext(UserContext);

export {UserContextProvider, useUser};