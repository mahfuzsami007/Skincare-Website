import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const columns = [
  { title: "Customer Service", links: ["Shop", "Help & Contact us", "Terms & Conditions", "Refund, Return Policy & Order Cancellations", "Showroom Address"] },
  { title: "Company", links: ["Wholesale Inquiries & Business Collaboration", "Skin Care Blog", "About Our Company", "Privacy policy"] },
  { title: "Social Media", links: ["Facebook Page", "Facebook Group", "Instagram", "Tiktok"] },
  { title: "Profile", links: ["My account", "Checkout", "Wishlist", "Cart"] }
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
                  <li key={link}>
                    <Link 
                      to="#" 
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
                        {link}
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