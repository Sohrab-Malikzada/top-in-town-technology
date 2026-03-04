import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Phone, Mail, ChevronDown, LogOut, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user, signOut } = useAuth();

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
    <div
      className="relative"
      onMouseEnter={() => setOpenDropdown(id)}
      onMouseLeave={() => setOpenDropdown(null)}
    >
      {trigger}
      {openDropdown === id && (
        <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-xl shadow-card p-5 z-50 min-w-[280px]">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Top bar */}
      <div className="bg-muted/50 border-b border-border/50 py-2 hidden md:block">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <a href="tel:+14129537506" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="h-3.5 w-3.5" /> +1 (412) 953-7506
            </a>
            <a href="mailto:info@topintown.tech" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="h-3.5 w-3.5" /> info@topintown.tech
            </a>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
            🎓 5,000+ Courses Available
          </span>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Top in Town" className="h-9" />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg leading-none">Top in Town</span>
              <span className="block text-[10px] text-muted-foreground leading-none mt-0.5">TECHNOLOGY</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* About */}
            <MegaDropdown
              id="about"
              trigger={
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  About <ChevronDown className="h-3.5 w-3.5" />
                </button>
              }
            >
              <div className="space-y-1 w-56">
                {aboutLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpenDropdown(null)}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </MegaDropdown>

            {/* All Courses */}
            <MegaDropdown
              id="courses"
              trigger={
                <Link to="/courses" className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
                  All Courses <ChevronDown className="h-3.5 w-3.5" />
                </Link>
              }
            >
              <div className="grid grid-cols-3 gap-1 w-[540px] max-h-[420px] overflow-y-auto">
                {dbCategories.map((cat) => (
                  <Link key={cat.id} to={`/courses?category=${cat.slug}`} className="px-3 py-2 text-sm rounded-lg hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-colors truncate" onClick={() => setOpenDropdown(null)}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </MegaDropdown>

            {/* Learning Options */}
            <MegaDropdown
              id="learning"
              trigger={
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Learning Options <ChevronDown className="h-3.5 w-3.5" />
                </button>
              }
            >
              <div className="space-y-1 w-64">
                {learningLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="block px-3 py-2 text-sm rounded-lg hover:bg-surface-hover text-muted-foreground hover:text-foreground transition-colors" onClick={() => setOpenDropdown(null)}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </MegaDropdown>

            <Link to="/contact" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
            <Link to="/request-info" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Request Info</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-48 bg-muted border-border/50 pr-9 text-sm h-9" />
              <button type="submit" className="absolute right-2.5 text-muted-foreground hover:text-primary transition-colors"><Search className="h-4 w-4" /></button>
            </form>

            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/dashboard"><Button variant="outline" size="sm" className="border-border/50"><LayoutDashboard className="h-4 w-4 mr-1.5" />Dashboard</Button></Link>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground"><LogOut className="h-4 w-4" /></Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login"><Button variant="outline" size="sm" className="border-border/50">Login</Button></Link>
                <Link to="/signup"><Button size="sm" className="bg-gradient-primary text-accent-foreground">Sign Up</Button></Link>
              </div>
            )}

            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background p-4 space-y-2 max-h-[80vh] overflow-y-auto">
            <form onSubmit={handleSearch} className="flex items-center relative mb-4 md:hidden">
              <Input placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-muted border-border/50 pr-9 text-sm" />
              <button type="submit" className="absolute right-3 text-muted-foreground"><Search className="h-4 w-4" /></button>
            </form>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 pt-2">About</p>
            {aboutLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
            ))}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 pt-2">Courses</p>
            <Link to="/courses" className="block px-4 py-2 text-sm text-primary font-medium hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>All Courses</Link>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 pt-2">Learning Options</p>
            {learningLinks.map((link) => (
              <Link key={link.to} to={link.to} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>{link.label}</Link>
            ))}
            <div className="border-t border-border/50 pt-2 mt-2">
              <Link to="/contact" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
              <Link to="/request-info" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Request Info</Link>
            </div>
            <div className="border-t border-border/50 pt-2 mt-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
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
