import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function DashboardHome() {
  const { user } = useAuth();
  const username = user?.name.toLowerCase().replace(/\s/g, '');

  return (
    <div className="font-mont text-[15px] leading-relaxed text-muted">
      <p className="mb-6">
        Hello <strong className="text-ink">{username}</strong> (not <strong className="text-ink">{username}</strong>?{" "}
        <Link to="/login" className="underline hover:text-ink">Log out</Link>)
      </p>
      <p>
        From your account dashboard you can view your{" "}
        <Link to="/account/orders" className="underline hover:text-ink">recent orders</Link>, manage your{" "}
        <Link to="/account/addresses" className="underline hover:text-ink">shipping and billing addresses</Link>, and{" "}
        <Link to="/account/details" className="underline hover:text-ink">edit your password and account details</Link>.
      </p>
    </div>
  );
}