import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      navigate("/"); // Redirect to home on success
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20">
      <div className="w-full max-w-md border border-line p-8 md:p-12">
        <h2 className="mb-8 text-center font-abril text-[32px] uppercase tracking-[0.02em] text-ink">
          Login
        </h2>

        {error && (
          <div className="mb-6 bg-red-50 p-3 text-center font-mont text-[13px] text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block font-mont text-[12px] font-bold uppercase tracking-wider text-muted">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-mont text-[12px] font-bold uppercase tracking-wider text-muted">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-black p-3 font-mont text-[13px] font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center font-mont text-[13px] text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-ink hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}