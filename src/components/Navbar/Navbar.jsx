import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";
import logotmdb from "../../assets/logotmdb.png";
import magnifying from "../../assets/magnifying-glass.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <div className="navbar">
      <div className="bar">
        <img src={logotmdb} alt="TMDB Logo" />
      </div>
      <div className="others">
        {user ? (
          <div className="user-info">
            <span className="username">{user.displayName || user.email}</span>
            <button className="i" onClick={handleLogout}>
              <h3>Logout</h3>
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="i">
              <h3>Login / Signup</h3>
            </button>
          </Link>
        )}
        <a href="#">
          <img src={magnifying} alt="Search" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
