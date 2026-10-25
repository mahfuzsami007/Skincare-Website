import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, User, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext"; // Import Auth Hook
import logo from "../../assets/logo/skincarelogo-1.png"; 
import { useCart } from "../../context/CartContext";

const navLinks = [
  { 
    label: "BRANDS", 
    href: "#",
    submenu: [
      { title: "KOREAN BRAND", links: ["COSRX", "Beauty of Joseon", "SKIN1004", "Anua", "Round Lab", "Torriden"] },
      { title: "USA/UK/FRANCE", links: ["The Ordinary", "CeraVe", "La Roche Posay", "Paula's Choice", "Cetaphil"] }
    ]
  },
  { 
    label: "SKIN CARE", 
    href: "#",
    submenu: [
      { title: "PRODUCT TYPE", links: ["Cleansing Balm", "Cleansing Oil", "Water Cleanser", "Exfoliator", "Toner", "Toner Pad"] },
      { title: "TREATMENTS", links: ["Essence", "Serum / Ampoule", "Cream / Moisturizer", "Sheet Mask", "Sleeping Mask"] },
      { title: "SUN & CARE", links: ["Sunscreen", "Lotion", "Lip Care", "Eye Care", "Spot Treatment"] }
    ]
  },
  { 
    label: "HAIR & BODY", 
    href: "#",
    submenu: [
      { title: "HAIR", links: ["Shampoo", "Conditioner", "Hair Oil", "Scalp Care"] },
      { title: "BODY", links: ["Body Wash", "Body Lotion", "Body Scrub", "Deodorant"] }
    ]
  },
  { label: "CLEARANCE SALE", href: "#" },
  { label: "COMBO", href: "#" },
];

export function Header() {
  const { isAuthenticated, user, logout } = useAuth(); // Get Auth State
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 w-full border-b border-line bg-white transition-shadow duration-300",
          scrolled && "shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="container-grid">
          <div className="grid h-[90px] grid-cols-3 items-center">
            
            {/* Left: Nav Links */}
            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((item) => (
                <div 
                  key={item.label} 
                  className="h-[90px] flex items-center"
                  onMouseEnter={() => setActiveMenu(item.submenu ? item.label : null)}
                >
                  <Link
                    to={item.href}
                    className="font-mont text-[13px] font-medium uppercase tracking-[0.05em] text-ink transition-colors hover:text-muted"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>
            
            {/* Left: Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center lg:hidden" 
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>

            {/* Center: Local Logo */}
            <Link to="/" className="flex justify-center">
              <img
                src={logo}
                alt="SKIN CARE bd.com"
                className="h-[65px] w-auto object-contain"
              />
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-5 sm:gap-6">
              {/* Dynamic Account Link */}
              <Link 
                to={isAuthenticated ? "/dashboard" : "/login"} 
                aria-label="Account" 
                className="group flex h-10 items-center justify-center gap-2 hover:text-muted transition"
              >
                <User size={22} strokeWidth={1.5} />
                {/* Show name on desktop if logged in */}
                {isAuthenticated && (
                  <span className="hidden xl:block font-mont text-[13px] font-medium uppercase tracking-[0.05em] text-ink group-hover:text-muted">
                    {user?.name.split(" ")[0]}
                  </span>
                )}
              </Link>
              
              <Link to="/cart" className="flex items-center gap-1.5 font-mont text-[13px] font-medium uppercase tracking-[0.05em] text-ink hover:text-muted transition">
                  <span className="hidden sm:block">CART</span>
                  <span className="text-muted">({cartCount})</span>
              </Link>

              <button onClick={() => setSearchOpen(!searchOpen)} className="flex h-10 w-8 items-center justify-center hover:text-muted transition">
                <Search size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Slide-down Search Bar */}
        <div className={cn("overflow-hidden border-t border-line bg-white transition-[max-height] duration-300 ease-in-out", searchOpen ? "max-h-[100px]" : "max-h-0")}>
          <div className="container-grid">
            <form className="flex items-center gap-4 py-6" onSubmit={(e) => e.preventDefault()}>
              <Search size={20} className="text-muted" />
              <input type="text" placeholder="Enter keyword..." className="flex-1 border-b border-line bg-transparent py-2 font-mont text-[15px] focus:border-ink focus:outline-none placeholder:text-soft" />
            </form>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div 
          className={cn(
            "absolute left-0 top-[90px] w-full overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out",
            activeMenu ? "max-h-[500px] border-t border-line opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container-grid py-10">
            {navLinks.find(l => l.label === activeMenu)?.submenu && (
              <div className="flex gap-16">
                {navLinks.find(l => l.label === activeMenu)!.submenu!.map((column) => (
                  <div key={column.title} className="flex flex-col gap-4">
                    <h4 className="font-mont text-[12px] font-bold uppercase tracking-wider text-muted">
                      {column.title}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {column.links.map((link) => (
                        <li key={link}>
                          <Link to="#" className="font-mont text-[14px] text-ink hover:text-muted transition-colors">
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <div className={cn("fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 lg:hidden", mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0")} onClick={() => setMobileMenuOpen(false)} />
      
      <div className={cn("fixed bottom-0 left-0 top-0 z-[70] w-[80vw] max-w-[320px] bg-[#111] text-white transition-transform duration-300 ease-in-out lg:hidden flex flex-col", mobileMenuOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between border-b border-gray-800 p-6">
          <span className="font-abril text-2xl text-white">MENU</span>
          <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
        </div>
        
        <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
          {navLinks.map((item) => (
            <Link key={item.label} to={item.href} className="font-mont text-[14px] font-medium uppercase tracking-widest text-gray-300 hover:text-white">
              {item.label}
            </Link>
          ))}

          <div className="mt-auto border-t border-gray-800 pt-6">
            {isAuthenticated ? (
              <button 
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="font-mont text-[14px] font-medium uppercase tracking-widest text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="font-mont text-[14px] font-medium uppercase tracking-widest text-white hover:text-gray-300"
              >
                Login / Register
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}