import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "staff@email.com" && password === "password123") {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect details");
    }
  };

  return (
    <div>
      <h2>Staff Portal Login</h2>
      {isLoggedIn ? (
        <p>Welcome Staff!</p>
      ) : (
        <form on onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Staff Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
