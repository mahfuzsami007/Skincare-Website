import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await register(name, email, password, passwordConfirmation);
      navigate("/");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(Object.values(err.response.data.errors).flat().join(" "));
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20">
      <div className="w-full max-w-md border border-line p-8 md:p-12">
        <h2 className="mb-8 text-center font-abril text-[32px] uppercase tracking-[0.02em] text-ink">
          Register
        </h2>

        {error && (
          <div className="mb-6 bg-red-50 p-3 text-center font-mont text-[13px] text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block font-mont text-[12px] font-bold uppercase tracking-wider text-muted">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none"
            />
          </div>

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

          <div>
            <label className="mb-2 block font-mont text-[12px] font-bold uppercase tracking-wider text-muted">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full border border-line p-3 font-mont text-[14px] focus:border-ink focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 bg-black p-3 font-mont text-[13px] font-bold uppercase tracking-wider text-white transition hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center font-mont text-[13px] text-muted">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-ink hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}