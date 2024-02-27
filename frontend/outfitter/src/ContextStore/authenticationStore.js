// AuthContext.js
import { createContext, useState } from "react";

export const AuthContext = createContext({ signin: "", toggleForm: () => {} });

export const AuthProvider = ({ children }) => {
  const [isSignInFormVisible, setIsSignInFormVisible] = useState(true);

  const toggleForm = () => {
    setIsSignInFormVisible((prevState) => !prevState);
  };

  return (
    <AuthContext.Provider
      value={{ signin: isSignInFormVisible, toggleForm: toggleForm }}
    >
      {children}
    </AuthContext.Provider>
  );
};
