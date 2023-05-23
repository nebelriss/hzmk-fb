import { signOut } from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase.config';
import { firebaseContext } from '../context/firebase.context';

export const EventPage = () => {
  const navigate = useNavigate();

  const context = useContext(firebaseContext);

  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  if (context?.authenticating) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>Event Page</h1>
      <p>current user: {context?.user?.email}</p>
      <button onClick={onLogout}>logout</button>
    </div>
  );
};
