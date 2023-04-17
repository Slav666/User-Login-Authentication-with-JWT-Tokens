import React, { FC } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface Props {
  allowedRoles: string;
}

const RequireAuth: FC = ({ allowedRoles }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.roles?.find(role => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate replace state={{ from: location }} to="/unauthorized" />
  ) : (
    <Navigate replace state={{ from: location }} to="/login " />
  );
};

export default RequireAuth;
