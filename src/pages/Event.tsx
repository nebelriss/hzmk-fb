import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EventPage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const sub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser ?? undefined);
      }
      setLoading(false);
    });
    return sub;
  }, []);

  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>Event Page</h1>
      <p>current user: {user?.email}</p>
      <button onClick={onLogout}>logout</button>
    </div>
  );
};
