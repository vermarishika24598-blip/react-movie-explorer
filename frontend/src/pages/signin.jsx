import { useState } from "react";
import { signin, getMe } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signin({ email, password }); // login
      const user = await getMe();         // 👈 LOAD USER
      
      if (setUser && user) {
        setUser(user);                   // 👈 UPDATE STATE
      }
      
      navigate("/profile");              // 👈 GO TO PROFILE
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid email or password";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-950 px-4 text-neutral-200 relative overflow-hidden">
      
      {/* Premium Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="bg-neutral-900 border border-neutral-800/80 p-8 rounded-2xl w-full max-w-md shadow-2xl relative z-10">
        
        <div className="mb-8 text-center">
          <h2 className="text-white text-3xl font-black tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="text-neutral-400 text-sm">
            Sign in to access your premium movie explorer
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-5 text-center font-medium">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 pl-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 pl-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-xl transition-all text-sm tracking-wide flex justify-center items-center"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-neutral-400 font-medium">
          Don't have an account?{" "}
          <Link to="/signup" className="text-amber-400 hover:underline font-bold ml-1">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}