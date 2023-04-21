import React, { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from '../context/authProvider';
import useLogout from '~/hooks/useLogout';

const Home: FC = () => {
  // const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/linkpage');
  };

  console.log('sign out', signOut);
  return (
    <section className="flex w-full max-w-md flex-col justify-start bg-cyan-400 p-2">
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
