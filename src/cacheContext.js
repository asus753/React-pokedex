import React,{useEffect, useReducer, createContext} from 'react'

export const CacheContext = createContext()
CacheContext.displayName = 'Cache'

const cacheReducer = (state, action) => {
  const {type, payload} = action

  switch(type){
    case 'SET_CACHE': return {...state, [payload.key] : payload.value}
    default : return {...state}
  }
}



export const CacheProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cacheReducer,JSON.parse(localStorage.getItem('POKE_API')))

  useEffect(() => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('POKE_API', serializedState);
  }, [state]);

  return <CacheContext.Provider value={{ state, dispatch }}>{children}</CacheContext.Provider>;
}
