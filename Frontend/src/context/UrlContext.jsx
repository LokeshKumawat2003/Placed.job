import React, { createContext, useState, useContext } from 'react';

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState('https://placed-07jh.onrender.com');

  const setPassUrl = (newUrl) => {
    setUrl(newUrl);
  };

  return (
    <UrlContext.Provider value={{ url, setPassUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

// Custom hook to use the URL context
export const useUrl = () => {
  return useContext(UrlContext);
};
