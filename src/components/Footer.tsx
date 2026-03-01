import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/50 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center font-display font-bold text-accent-foreground text-sm">
                TT
              </div>
              <div>
                <span className="font-display font-bold text-lg leading-none">Top in Town</span>
                <span className="block text-[10px] text-muted-foreground leading-none mt-0.5">TECHNOLOGY</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Your trusted global IT training partner delivering 5,000+ courses across 80+ countries.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="tel:+14129537506" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" /> +1 (412) 953-7506
              </a>
              <a href="mailto:info@topintown.tech" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> info@topintown.tech
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" /> Global Training Centers
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="font-display font-semibold mb-4">Popular Categories</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Microsoft", "AWS", "Cisco", "Cybersecurity", "Cloud Computing", "Data Science & AI", "DevOps", "Project Management"].map((cat) => (
                <li key={cat}>
                  <Link to={`/courses?category=${cat.toLowerCase()}`} className="hover:text-primary transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Options */}
          <div>
            <h4 className="font-display font-semibold mb-4">Learning Options</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["Live Online Training", "Classroom Training", "1-on-1 Training", "Self-Paced Learning", "Corporate Training", "Fly-Me-A-Trainer"].map((opt) => (
                <li key={opt}>
                  <Link to="/learning-options" className="hover:text-primary transition-colors">{opt}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Our Partners</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Top in Town Technology. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/refund" className="hover:text-primary transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
