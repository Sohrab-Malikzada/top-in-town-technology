import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/courses";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

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
          <div className="flex items-center gap-4">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              🎓 5,000+ Courses Available
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center font-display font-bold text-accent-foreground text-sm">
              TT
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg leading-none">Top in Town</span>
              <span className="block text-[10px] text-muted-foreground leading-none mt-0.5">TECHNOLOGY</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setIsCoursesOpen(true)}
              onMouseLeave={() => setIsCoursesOpen(false)}
            >
              <Link
                to="/courses"
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-colors"
              >
                All Courses <ChevronDown className="h-3.5 w-3.5" />
              </Link>

              {isCoursesOpen && (
                <div className="absolute top-full left-0 mt-1 w-[600px] bg-card border border-border rounded-xl shadow-card p-4 grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/courses?category=${cat.slug}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-hover transition-colors group"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">{cat.name}</span>
                        <span className="block text-xs text-muted-foreground">{cat.courseCount} courses</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </Link>
            <Link to="/learning-options" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Learning Options
            </Link>
            <Link to="/contact" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 bg-muted border-border/50 pr-9 text-sm h-9"
              />
              <button type="submit" className="absolute right-2.5 text-muted-foreground hover:text-primary transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </form>

            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50">
                Login
              </Button>
            </Link>

            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background p-4 space-y-2">
            <form onSubmit={handleSearch} className="flex items-center relative mb-4 md:hidden">
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-muted border-border/50 pr-9 text-sm"
              />
              <button type="submit" className="absolute right-3 text-muted-foreground">
                <Search className="h-4 w-4" />
              </button>
            </form>
            <Link to="/courses" className="block px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm" onClick={() => setIsMenuOpen(false)}>
              All Courses
            </Link>
            <Link to="/about" className="block px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground text-sm" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/learning-options" className="block px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground text-sm" onClick={() => setIsMenuOpen(false)}>
              Learning Options
            </Link>
            <Link to="/contact" className="block px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground text-sm" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
            <Link to="/login" className="block px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground text-sm sm:hidden" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
