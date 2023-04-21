import React, { FC } from 'react';
import axios from '../api/axios';
import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register: FC = () => {
  const userRef = useRef<HTMLInputElement>();
  const [user, setUser] = useState('');

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg('');
  }, [user, password, matchPassword]);

  const onSubmit = async () => {
    // e.preventDefault();
    const value1 = USER_REGEX.test(user);
    const value2 = PWD_REGEX.test(password);
    if (!value1 || !value2) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd: password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );

      console.log(JSON.stringify(response?.data));
      setSuccess(true);
      setUser('');
      setPassword('');
      setMatchPassword('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="*">Sign in</a>
          </p>
        </section>
      ) : (
        <section className="flex w-full max-w-md flex-col justify-start bg-cyan-400 p-2">
          <h1>Register</h1>
          <form
            className=" flex grow flex-col justify-evenly pb-2 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="username">Username:</label>
            <input
              {...register('username')}
              ref={userRef}
              required
              aria-describedby="uidnote"
              aria-invalid={validName ? 'false' : 'true'}
              autoComplete="off"
              id="username"
              type="text"
              value={user}
              onBlur={() => setUserFocus(false)}
              onChange={e => setUser(e.target.value)}
              onFocus={() => setUserFocus(true)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="password">Password:</label>
            <input
              {...register('password')}
              required
              aria-describedby="pwdnote"
              aria-invalid={validPassword ? 'false' : 'true'}
              id="password"
              type="password"
              value={password}
              onBlur={() => setPwdFocus(false)}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setPwdFocus(true)}
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && !validPassword ? 'instructions' : 'offscreen'
              }
            >
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{' '}
              <span aria-label="exclamation mark">!</span>{' '}
              <span aria-label="at symbol">@</span>{' '}
              <span aria-label="hashtag">#</span>{' '}
              <span aria-label="dollar sign">$</span>{' '}
              <span aria-label="percent">%</span>
            </p>
            <label htmlFor="confirm_pwd">Confirm Password:</label>
            <input
              {...register('confirm_pwd')}
              required
              aria-describedby="confirmnote"
              aria-invalid={validMatch ? 'false' : 'true'}
              id="confirm_pwd"
              type="password"
              value={matchPassword}
              onBlur={() => setMatchFocus(false)}
              onChange={e => setMatchPassword(e.target.value)}
              onFocus={() => setMatchFocus(true)}
            />
            <p
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
              id="confirmnote"
            >
              Must match the first password input field.
            </p>
            <button
              className="mt-2 rounded-md bg-orange-400 text-5xl"
              disabled={
                !validName || !validPassword || !validMatch ? true : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
