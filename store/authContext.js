import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();



  function authenticate(token) {
    AsyncStorage.setItem("token", token);
    setAuthToken(token);
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
