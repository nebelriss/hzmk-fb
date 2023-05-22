import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.config";

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
      setLoading(false);
      return sub;
    });
  }, [navigate]);

  async function onLogin(e: MouseEvent<HTMLElement>) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>Main Page / login</h1>
      <div>
        <form>
          <div>
            <label htmlFor="email">email</label>
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="submit" onClick={onLogin} value={"login"} />
          </div>
        </form>
      </div>
    </div>
  );
};
