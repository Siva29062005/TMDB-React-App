import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      toast.success("successfully signed in!",{
        position:"top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("please enter valid credentials!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isSignUp ? "Create an Account" : "Sign In"}</h2>
        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="k"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="k"
          />
          <button type="submit" className="bi">{isSignUp ? "Sign Up" : "Sign In"}</button>
        </form>
        <p onClick={() => setIsSignUp(!isSignUp)} className="lp">
          {isSignUp ? "Already have an account? Sign In" : "New to TMDB? Sign Up now"}
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
