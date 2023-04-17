import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
const Unauthorized: FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div>
        <button
          className="mt-2 rounded-md bg-orange-400 text-5xl"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
