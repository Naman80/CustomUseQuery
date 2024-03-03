import { useContext, useEffect, useState } from "react";
import UseQueryContext, { IUseQueryContextProps } from "../../../../context/UseQueryContext";
import { checkStale } from "./utils/checkStale";

export const useCustomUseQueryHook = ({ queryKey, queryFn, staleTime = 0, }) => {
  const { queryMap } = useContext(UseQueryContext) as IUseQueryContextProps;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState(() => {
    if (queryMap.has(queryKey[0])) {
      return queryMap.get(queryKey[0]).data;
    } else return [];
  });
  const refetch = () => { fetchData(false) }
  const fetchData = async (showLoading: boolean) => {
    try {
      showLoading && setIsLoading(true);
      setError({});
      setIsError(false);
      const responseData = await queryFn();
      queryMap?.set(queryKey[0], { data: responseData, staleTime: new Date().getTime() });
      setData(responseData);
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      showLoading && setIsLoading(false);
    }
  };
  useEffect(() => {
    if (queryMap.has(queryKey[0])) {
      const isStale = checkStale(queryMap, queryKey, staleTime);
      if (isStale) {
        fetchData(false);
      }
    } else {
      fetchData(true);
    }
  }, []);

  return { isLoading, isError, error, data, refetch };
};
