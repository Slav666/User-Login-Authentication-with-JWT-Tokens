import React, { FC } from 'react';
import { useContext } from 'react';
import AuthContext from '../context/authProvider';
import { string } from 'zod';

const useAuth: FC = () => {
  return useContext(AuthContext);
};

export default useAuth;
