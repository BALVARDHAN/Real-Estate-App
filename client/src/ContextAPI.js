import { createContext, useEffect, useState } from "react";
export const Context = createContext({
  userName: "",
  email: "",
  wishlist: [],
  setContext: () => {},
});

export default function MainContextProvider({ children }) {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({
    userName: "",
    email: "",
    wishlist: [],
  });
  const ctxValue = {
    userName: loggedInUserDetails["userName"],
    email: loggedInUserDetails["email"],
    wishlist: loggedInUserDetails["wishlist"],
    setContext: setLoggedInUserDetails,
  };
  return <Context.Provider value={ctxValue}>{children}</Context.Provider>;
}
