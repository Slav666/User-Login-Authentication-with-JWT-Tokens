import React, { FC } from 'react';
import { createContext, useState } from 'react';

interface CurrentUserContextType {
  username: string;
  password: string;
}

// interface Auth {
//   auth:;

// }

const AuthContext = createContext({} as CurrentUserContextType);

export const AuthProvider: FC = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  console.log('children', children);
  const [auth, setAuth] = useState({});
  console.log('auth', auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
