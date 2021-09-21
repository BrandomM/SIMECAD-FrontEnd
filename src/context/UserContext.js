import { useState, useEffect } from "react";
import { createContext } from "react/cjs/react.development";

export const UserContext = createContext();

const initialUser = null;

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const data = { user, setUser };

  useEffect(() => {
    if (localStorage.getItem("usuario")) {
      setUser(JSON.parse(localStorage.getItem("usuario")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("usuario", JSON.stringify(user));
  }, [user]);

  // localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}
