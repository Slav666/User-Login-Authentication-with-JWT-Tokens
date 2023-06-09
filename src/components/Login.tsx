import React, { FC } from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useLocalStorage from '../hooks/useLocalStorage';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login: FC = () => {
  const { setAuth }: any = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { register, handleSubmit } = useForm();

  const userRef = useRef<HTMLInputElement>();
  const errRef = useRef<HTMLInputElement>();

  const [user, setUser] = useLocalStorage('user', '');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const onSubmit = async () => {
    // e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="flex w-full max-w-md flex-col justify-start bg-cyan-400 p-2">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form
        className=" flex grow flex-col justify-evenly pb-2 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username" className="mt-1">
          Username:
        </label>
        <input
          {...register('username')}
          ref={userRef}
          required
          autoComplete="off"
          className="border-2 border-orange-500 "
          id="username"
          type="text"
          value={user}
          onChange={e => setUser(e.target.value)}
        />

        <label htmlFor="password" className="mt-1">
          Password:
        </label>
        <input
          {...register('password')}
          required
          className="border-2 border-orange-500 "
          id="password"
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
        />
        <button className="mt-2 rounded-md bg-orange-400 text-5xl">
          Sign In
        </button>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="inline-block">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
