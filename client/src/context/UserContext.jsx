import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    userRole: null, // "educator", "student", or null
    userId: null,
  });

  const updateUserState = (newState) => {
    setUserState((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  const clearUserState = () => {
    setUserState({
      userRole: null,
      userId: null,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...userState,
        updateUserState,
        clearUserState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within an UserProvider");
  }
  return context;
};