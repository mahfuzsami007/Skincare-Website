import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const columns = [
  { 
    title: "Customer Service", 
    links: [
      { name: "Shop", path: "/shop" },
      { name: "Help & Contact us", path: "#" },
      { name: "Terms & Conditions", path: "#" },
      { name: "Refund, Return Policy & Order Cancellations", path: "#" },
      { name: "Showroom Address", path: "#" }
    ] 
  },
  { 
    title: "Company", 
    links: [
      { name: "Wholesale Inquiries & Business Collaboration", path: "#" },
      { name: "Skin Care Blog", path: "#" },
      { name: "About Our Company", path: "#" },
      { name: "Privacy policy", path: "#" }
    ] 
  },
  { 
    title: "Social Media", 
    links: [
      { name: "Facebook Page", path: "https://facebook.com/skincarebddotcom" },
      { name: "Facebook Group", path: "#" },
      { name: "Instagram", path: "https://instagram.com/skincarebd.co" },
      { name: "Tiktok", path: "https://tiktok.com/@skincarebd.com" }
    ] 
  },
  { 
    title: "Profile", 
    links: [
      { name: "My account", path: "/account" },
      { name: "Checkout", path: "/checkout" },
      { name: "Wishlist", path: "/account" }, // Placeholder for now
      { name: "Cart", path: "/cart" }
    ] 
  }
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white pt-16 pb-24 lg:pb-16">
      <div className="container-grid">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-6 font-mont text-[15px] font-bold uppercase tracking-[0.05em] text-ink">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      // THE HOVER MAGIC HAPPENS HERE
                      className="group relative flex items-center font-mont text-[14px] text-ink transition-colors hover:text-muted"
                    >
                      {/* Arrow slides in from -left-4 to left-0 */}
                      <ArrowRight 
                        size={14} 
                        className="absolute left-[-20px] opacity-0 transition-all duration-300 group-hover:left-0 group-hover:opacity-100" 
                      />
                      {/* Text shifts right slightly */}
                      <span className="transition-transform duration-300 group-hover:translate-x-5">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}