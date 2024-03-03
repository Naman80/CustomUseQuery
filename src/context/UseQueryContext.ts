import { createContext } from "react";

export interface IUseQueryContextProps {
    queryMap: Map<String, any>
}
const UseQueryContext = createContext<IUseQueryContextProps | null>(null);

export default UseQueryContext;
