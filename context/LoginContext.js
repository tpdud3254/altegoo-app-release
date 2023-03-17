import React, { createContext, useState } from "react";

export const LoginContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    firstLogin: false,
    setFirstLogin: () => {},
});

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstLogin, setFirstLogin] = useState(false);

    const value = { isLoggedIn, setIsLoggedIn, firstLogin, setFirstLogin };

    return (
        <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
    );
};

const LoginConsumer = LoginContext.Consumer;

export { LoginProvider, LoginConsumer };
export default LoginContext;
