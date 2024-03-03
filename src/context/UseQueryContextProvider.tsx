import UseQueryContext from "./UseQueryContext";
import React from "react";

const useQueryContextProvider = ({ children }) => {
  const queryMap = new Map<String, any>();
  return (
    <UseQueryContext.Provider value={{ queryMap }}>
      {children}
    </UseQueryContext.Provider>
  );
};
export default useQueryContextProvider;
