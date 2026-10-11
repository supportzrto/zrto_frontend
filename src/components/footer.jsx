import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-14 px-6" style={{ background: "#1e1b4b" }}>
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo size={34} />
              </div>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#a5b4fc" }}>AI RTO &amp; COD optimization for Indian Ecommerce and D2C brands. Stop fake orders before they ship.</p>
            </div>
            <div>
              <h4 className="font-extrabold mb-4 text-xs uppercase tracking-widest" style={{ color: "#818cf8" }}>Product</h4>
              <div className="space-y-2.5 text-sm" style={{ color: "#a5b4fc" }}>
                {[
                  { name: "How it Works", path: "/#how-it-works" },
                  { name: "Pricing", path: "/pricing" }
                ].map(item => (
                  <div key={item.name}>
                    <a
                      href={item.path}
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-extrabold mb-4 text-xs uppercase tracking-widest" style={{ color: "#818cf8" }}>Company</h4>
              <div className="space-y-2.5 text-sm" style={{ color: "#a5b4fc" }}>
                {[
                  { name: "About Us", path: "/about" },
                  { name: "Contact", path: "/contact" },
                  { name: "Privacy Policy", path: "/privacy" },
                  { name: "Terms of Service", path: "/terms" }
                ].map(item => (
                  <div key={item.name}>
                    <Link to={item.path} className="hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-6 flex items-center justify-between text-xs" style={{ borderTop: "1px solid rgba(165,180,252,0.2)", color: "#6366f1" }}>
            <span>© {new Date().getFullYear()} ZRTO. All rights reserved.</span>
            <div className="flex gap-4">
              {["LinkedIn", "Instagram", "YouTube"].map(s => <span key={s} className="hover:text-white cursor-pointer transition-colors">{s}</span>)}
            </div>
          </div>
        </footer>   
  );
}