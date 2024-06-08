// FileDataContext.js

import React, { createContext, useContext, useState } from 'react';

const FileDataContext = createContext();

export const useFileData = () => useContext(FileDataContext);

export const FileDataProvider = ({ children }) => {
  const [fileData, setFileData] = useState(null);

  return (
    <FileDataContext.Provider value={{ fileData, setFileData }}>
      {children}
    </FileDataContext.Provider>
  );
};
