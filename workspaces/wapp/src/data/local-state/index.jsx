import { useEffect, useState } from 'react'; 

const useLocalState = (defaultValue, key) => {
  const [value, setValue]  = useState(() => {
    const scopedKey = `cs-${key}`
    const localValue = window.localStorage.getItem(scopedKey);
    return (
      localValue !== 'undefined' && 
      localValue !== undefined &&
      localValue !== null
    )
      ? JSON.parse(localValue)
      : defaultValue;
  }); 

  useEffect(() => {
    const scopedKey = `cs-${key}`
    window.localStorage.setItem(scopedKey, JSON.stringify(value));
  }, [key, value]); 

  return [value, setValue]; 
}; 

export default useLocalState;