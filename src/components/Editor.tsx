import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Editor: FC = () => {
  return (
    <section className="flex w-full max-w-md flex-col justify-start bg-cyan-400 p-2">
      <h1>Editors Page</h1>
      <br />
      <p>You must have been assigned an Editor role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Editor;
