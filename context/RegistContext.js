import React, { createContext, useState } from "react";

export const RegistContext = createContext({
    registInfo: false,
    setRegistInfo: () => {},
});

const RegistProvider = ({ children }) => {
    const [registInfo, setRegistInfo] = useState(false);

    const value = { registInfo, setRegistInfo };

    return (
        <RegistContext.Provider value={value}>
            {children}
        </RegistContext.Provider>
    );
};

const RegistConsumer = RegistContext.Consumer;

export { RegistProvider, RegistConsumer };
export default RegistContext;
