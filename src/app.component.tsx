import React from 'react';
import Register from './components/Register';
import LinkPage from './components/LinkPage';
import Unauthorized from './components/Unauthorized';
import Login from './components/Login';
import Layout from './components/Layout';
import Admin from './components/Admin';
import Lounge from './components/Lounge';
import Editor from './components/Editor';
import Home from './components/Home';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';

// interface Props {
//   allowedRoles: string;
// }

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<Register />} path="register" />
        <Route element={<Login />} path="login" />
        <Route element={<LinkPage />} path="linkpage" />
        <Route element={<Unauthorized />} path="unauthorized" />


        {/* Protect that routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route element={<Home />} path="/" />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route element={<Editor />} path="editor" />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route element={<Admin />} path="admin" />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route element={<Lounge />} path="lounge" />
          </Route>
        </Route>

        <Route element={<Missing />} path="*" />
      </Route>
    </Routes>
  );
}

export default App;
