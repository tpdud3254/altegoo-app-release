import React, { createContext, useState } from "react";

export const UserContext = createContext({
    info: {},
    setInfo: () => {},
});

const UserProvider = ({ children }) => {
    const [info, setInfo] = useState({});

    const value = { info, setInfo };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer };
export default UserContext;
