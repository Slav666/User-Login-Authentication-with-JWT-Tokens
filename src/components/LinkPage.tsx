import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const LinkPage: FC = () => {
  return (
    <section className="flex w-full max-w-md flex-col justify-start bg-cyan-400 p-2">
      <h1>Links</h1>
      <br />
      <h2>Public</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <br />
      <h2>Private</h2>
      <Link to="/">Home</Link>
      <Link to="/editor">Editors Page</Link>
      <Link to="/admin">Admin Page</Link>
    </section>
  );
};

export default LinkPage;
