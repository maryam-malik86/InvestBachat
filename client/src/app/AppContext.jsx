import { createContext, useEffect, useState } from "react";
// import Spinner from "./Spinner";
export const AppContext = createContext();
// step 1
export default function AppProvider({ children }) {
    const[isTrue,setIsTrue] = useState(true)
  const value = {
   isTrue,
   setIsTrue,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
