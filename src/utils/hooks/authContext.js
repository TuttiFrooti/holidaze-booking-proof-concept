import { createContext } from 'react';
import useLocalStorage from './useLocalStorage';

const AuthContext = createContext([null, () => { }]);

export const AuthProvider = (props) => {
  const [auth, setAuth, removeAuth] = useLocalStorage('jwt', null);
  return (
    <AuthContext.Provider value={[auth, setAuth, removeAuth]}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContext;