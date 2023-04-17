import React, { FC } from 'react';
import { useState, useEffect } from 'react';
// import axios, { axiosPrivate } from '../api/axios';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import { replace } from 'cypress/types/lodash';
// import useRefreshToken from '../hooks/useRefreshToken';

const User: FC = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const loaction = useLocation();
  // const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        console.log('response data from user component', response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>
        Users list
        {users?.length ? (
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user?.username}</li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
      </h2>
      {/* <button
        className="mt-2 rounded-md bg-orange-400 text-5xl"
        onClick={() => refresh()}
      >
        Refresh
      </button> */}
    </article>
  );
};

export default User;
