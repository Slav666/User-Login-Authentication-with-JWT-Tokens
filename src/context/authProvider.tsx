import React, { FC } from 'react';
import { createContext, useState } from 'react';
interface IAuth {
  user: string;
  password: string;
  roles: number[];
  accessToken: string;
}

const AuthContext = createContext({});

export const AuthProvider: FC = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  console.log('children', children);
  const [auth, setAuth] = useState<IAuth>({} as any);
  console.log('auth', auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
