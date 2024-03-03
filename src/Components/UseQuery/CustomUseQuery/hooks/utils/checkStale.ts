
export const checkStale = (queryMap, queryKey, staleTime) => {
  const storedtime = queryMap.get(queryKey[0]).staleTime;
  const currentTime = new Date().getTime();
  return currentTime >= storedtime + staleTime;
};
