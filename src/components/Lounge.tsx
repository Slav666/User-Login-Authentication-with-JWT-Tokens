import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Lounge: FC = () => {
  return (
    <section className="flex w-full max-w-md flex-col justify-start bg-cyan-400 p-2">
      <h1>The Lounge</h1>
      <br />
      <p>Admins and Editors can hang out here.</p>
      <div>
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Lounge;
