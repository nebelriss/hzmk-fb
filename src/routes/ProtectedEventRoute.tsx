import { onAuthStateChanged } from 'firebase/auth';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase.config';

interface IProtectedEventRoute extends PropsWithChildren {}

export function ProtectedEventRout({ children }: IProtectedEventRoute) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const sub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
      setLoading(false);
      return sub;
    });
  }, [navigate]);

  return <>{loading ? <div>is Loading</div> : children}</>;
}
