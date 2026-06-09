import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Signup({ setUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = await signup({ name, email, password });
      
      // Update app state if setUser hook is passed
      if (setUser && userData) {
        setUser(userData);
      }
      
      toast.success("Account created successfully! ");
      navigate("/profile"); // redirect after signup
      
    } catch (err) {
      // Axios error handle support for custom messages
      const errorMsg = err.response?.data?.message || err.message || "Signup failed";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-950 px-4 text-neutral-200 relative overflow-hidden">
      
      {/* Decorative Blur Background Accents */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Card */}
      <div className="bg-neutral-900 border border-neutral-800/80 p-8 rounded-2xl w-full max-w-md shadow-2xl relative z-10">
        
        <div className="mb-8 text-center">
          <h2 className="text-white text-3xl font-black tracking-tight mb-2">
            Create Account
          </h2>
          <p className="text-neutral-400 text-sm">
            Join now to build your premium watchlist
          </p>
        </div>

        {/* Local Inline Error Box */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-5 text-center font-medium animate-pulse">
            ⚠️ {error}
          </div>
        )}

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 pl-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1.5 pl-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
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
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Action Trigger Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] disabled:bg-neutral-800 disabled:text-neutral-600 text-black font-bold py-3 px-4 rounded-xl shadow-lg shadow-amber-500/10 transition-all duration-200 text-sm tracking-wide flex justify-center items-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Sub-context Redirection Options */}
        <div className="mt-6 text-center text-xs text-neutral-400 font-medium">
          Already have an account?{" "}
          <Link to="/signin" className="text-amber-400 hover:underline hover:text-amber-300 font-bold ml-1">
            Sign In here
          </Link>
        </div>

      </div>
    </div>
  );
}