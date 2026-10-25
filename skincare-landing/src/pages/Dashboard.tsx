import { useAuth } from "../context/AuthContext";

export function Dashboard() {
  const { user, role, logout } = useAuth();

  return (
    <div className="container-grid py-20">
      <div className="rounded-lg border border-line bg-white p-8">
        <h1 className="font-abril text-4xl uppercase">Dashboard</h1>
        <p className="mt-4 font-mont text-muted">
          Welcome back, <span className="font-bold text-ink">{user?.name}</span>!
        </p>
        
        <div className="mt-8 rounded border border-blue-200 bg-blue-50 p-4 font-mont text-sm text-blue-800">
          Your current role is: <strong className="uppercase">{role}</strong>
        </div>

        {role === "admin" && (
          <div className="mt-6 rounded border border-green-200 bg-green-50 p-4 font-mont text-sm text-green-800">
            <strong>Admin Access Granted:</strong> You can now build the Admin Product Management interface here.
          </div>
        )}

        <button
          onClick={logout}
          className="mt-10 bg-black px-6 py-3 font-mont text-[12px] font-bold uppercase tracking-wider text-white hover:bg-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}