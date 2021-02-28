const tokenKey = 'localData';

export default (): string => {
  const hasLocalData = localStorage.getItem(tokenKey);

  const localData =
    hasLocalData && JSON.parse(localStorage.getItem(tokenKey) ?? 'null');
  return hasLocalData && localData.token;
};
