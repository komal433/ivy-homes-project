import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DEMO_USERS = ["demo1@ivy.homes", "demo2@ivy.homes", "demo3@ivy.homes"];

export default function Login() {
  const { isAuthenticated, login, busy, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEMO_USERS[0]);
  const [password, setPassword] = useState("");

  if (isAuthenticated) return <Navigate to="/listings" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/listings");
    } catch {
      // error is already surfaced via auth context
    }
  }

  return (
    <div className="login-page">
      <div className="login-aside">
        <div className="eyebrow">THE BETTER WAY HOME</div>
        <h2>Find a place that feels like yours.</h2>
        <p>Curated homes, useful signals, and a calmer way to search the city.</p>
        <div className="login-aside-note"><span>01</span><span>Browse with confidence</span></div>
      </div>
      <form className="card login-box" onSubmit={handleSubmit}>
        <h1>
          ivy<span style={{ color: "var(--accent)" }}>.homes</span>
        </h1>
        <p className="sub">Your personal property workspace.</p>

        <div className="field">
          <label htmlFor="email">Email</label>
          <select id="email" value={email} onChange={(e) => setEmail(e.target.value)}>
            {DEMO_USERS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password issued with your API key"
            required
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button className="primary" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
