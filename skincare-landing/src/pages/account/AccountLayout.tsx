import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function AccountLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Dashboard", path: "/account", end: true },
    { name: "Orders", path: "/account/orders" },
    { name: "Offers & Coupons", path: "/account/offers" },
    { name: "Addresses", path: "/account/addresses" },
    { name: "Account details", path: "/account/details" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top CTA Banner */}
      <div className="w-full border-b border-line bg-[#fafafa] py-16 text-center md:py-24">
        <h1 className="font-abril text-[48px] uppercase tracking-[0.02em] text-ink md:text-[64px]">
          My Account
        </h1>
      </div>

      <div className="container-grid flex-1 py-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-[280px]">
            {/* Avatar & Name */}
            <div className="mb-10 flex flex-col items-start">
              <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=e5e5e5&color=000&size=128`} 
                  alt={user?.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="font-mont text-[22px] font-bold uppercase tracking-wider text-ink">
                HELLO
              </h2>
              <p className="font-mont text-[15px] text-muted">@{user?.name.toLowerCase().replace(/\s/g, '')}</p>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.end}
                  className={({ isActive }) =>
                    `py-3 font-mont text-[15px] transition-colors ${
                      isActive ? "text-ink font-semibold" : "text-muted hover:text-ink"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              <button
                onClick={handleLogout}
                className="py-3 text-left font-mont text-[15px] text-muted transition-colors hover:text-red-500"
              >
                Log out
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}