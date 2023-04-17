import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Users from './Users';

const Admin: FC = () => {
  return (
    <section className="flex w-full max-w-md flex-col justify-start bg-cyan-400 p-2">
      <h1>Admins Page</h1>
      <br />
      <Users />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
