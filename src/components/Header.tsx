import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Phone, Mail, ChevronDown, LogOut, LayoutDashboard, ShoppingCart, Sun, Moon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const aboutLinks = [
  { label: "About Us", to: "/about" },
  { label: "Leadership", to: "/about#leadership" },
  { label: "Our Partners", to: "/about#partners" },
  { label: "Happiness Guarantee", to: "/about#guarantee" },
  { label: "Student Feedback", to: "/about#feedback" },
  { label: "Testimonials", to: "/about#testimonials" },
  { label: "Our Awards", to: "/about#awards" },
];

const learningLinks = [
  { label: "Instructor-Led Online", to: "/learning-options#live-online" },
  { label: "Classroom Training", to: "/learning-options#classroom" },
  { label: "Self-Paced Learning", to: "/learning-options#self-paced" },
  { label: "1-on-1 Personal Training", to: "/learning-options#one-on-one" },
  { label: "Fly-Me-A-Trainer (FMAT)", to: "/learning-options#fmat" },
  { label: "Corporate Batch Training", to: "/learning-options#corporate" },
  { label: "Webinars as a Service", to: "/learning-options#webinars" },
  { label: "AI-Enhanced Learning", to: "/learning-options#ai-enhanced" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const { user, signOut, hasRole } = useAuth();
  const { count } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    supabase.from("categories").select("id, name, slug").order("sort_order").then(({ data }) => {
      if (data) setDbCategories(data);
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const MegaDropdown = ({ id, trigger, children }: { id: string; trigger: React.ReactNode; children: React.ReactNode }) => (
    <div className="relative" onMouseEnter={() => setOpenDropdown(id)} onMouseLeave={() => setOpenDropdown(null)}>
      {trigger}
      {openDropdown === id && (
        <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-xl shadow-card-hover p-5 z-50 min-w-[280px] animate-in fade-in-0 zoom-in-95 duration-150">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+14129537506" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="h-3.5 w-3.5" /> +1 (412) 953-7506
            </a>
            <a href="mailto:info@topintown.tech" className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Mail className="h-3.5 w-3.5" /> info@topintown.tech
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/verify-certificate" className="text-xs opacity-90 hover:opacity-100 transition-opacity">Verify Certificate</Link>
            <span className="text-xs bg-primary-foreground/15 px-3 py-1 rounded-full font-medium">🎓 5,000+ Courses</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="Top in Town" className="h-9" />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg leading-none text-foreground">Top in Town</span>
              <span className="block text-[10px] text-muted-foreground leading-none mt-0.5">TECHNOLOGY</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <MegaDropdown id="about" trigger={
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                About <ChevronDown className="h-3.5 w-3.5" />
              </button>
            }>
              <div className="space-y-0.5 w-56">
                {aboutLinks.map(link => (
                  <Link key={link.to} to={link.to} className="block px-3 py-2.5 text-sm rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpenDropdown(null)}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </MegaDropdown>

            <MegaDropdown id="courses" trigger={
              <Link to="/courses" className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors shadow-sm">
                All Courses <ChevronDown className="h-3.5 w-3.5" />
              </Link>
            }>
              <div className="grid grid-cols-3 gap-0.5 w-[540px] max-h-[420px] overflow-y-auto">
                {dbCategories.map(cat => (
                  <Link key={cat.id} to={`/courses?category=${cat.slug}`} className="px-3 py-2.5 text-sm rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors truncate" onClick={() => setOpenDropdown(null)}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </MegaDropdown>

            <MegaDropdown id="learning" trigger={
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                Learning Options <ChevronDown className="h-3.5 w-3.5" />
              </button>
            }>
              <div className="space-y-0.5 w-64">
                {learningLinks.map(link => (
                  <Link key={link.to} to={link.to} className="block px-3 py-2.5 text-sm rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpenDropdown(null)}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </MegaDropdown>

            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">Contact</Link>
            <Link to="/request-info" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">Request Info</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input placeholder="Search courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-44 bg-muted border-0 pr-9 text-sm h-9 rounded-lg focus-visible:ring-1 focus-visible:ring-primary" />
              <button type="submit" className="absolute right-2.5 text-muted-foreground hover:text-primary transition-colors"><Search className="h-4 w-4" /></button>
            </form>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Cart */}
            {user && (
              <Link to="/cart" className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="hidden sm:flex items-center gap-1.5">
                {hasRole("admin") && (
                  <Link to="/admin"><Button variant="ghost" size="sm" className="text-primary hover:bg-accent"><Shield className="h-4 w-4" /></Button></Link>
                )}
                <Link to="/dashboard"><Button variant="outline" size="sm" className="border-border"><LayoutDashboard className="h-4 w-4 mr-1.5" />Dashboard</Button></Link>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground"><LogOut className="h-4 w-4" /></Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                <Link to="/signup"><Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm">Sign Up</Button></Link>
              </div>
            )}

            <button className="lg:hidden p-2 rounded-lg hover:bg-muted" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background p-4 space-y-2 max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSearch} className="flex items-center relative mb-4 md:hidden">
              <Input placeholder="Search courses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="bg-muted border-0 pr-9 text-sm" />
              <button type="submit" className="absolute right-3 text-muted-foreground"><Search className="h-4 w-4" /></button>
            </form>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 pt-2">About</p>
            {aboutLinks.map(link => (
              <Link key={link.to} to={link.to} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
            ))}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 pt-2">Courses</p>
            <Link to="/courses" className="block px-4 py-2 text-sm text-primary font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>All Courses</Link>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 pt-2">Learning Options</p>
            {learningLinks.map(link => (
              <Link key={link.to} to={link.to} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              <Link to="/contact" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
              <Link to="/request-info" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Request Info</Link>
              <Link to="/verify-certificate" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Verify Certificate</Link>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              {user ? (
                <>
                  <Link to="/cart" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Cart ({count})</Link>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  {hasRole("admin") && <Link to="/admin" className="block px-4 py-2 text-sm text-primary font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>}
                  <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="block px-4 py-2 text-sm text-primary font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Sign Up Free</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
