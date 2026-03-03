import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, UserPlus, Loader2, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    const { error } = await signUp(email, password, fullName);
    setIsLoading(false);
    if (error) {
      toast.error(error.message || "Signup failed");
    } else {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <CheckCircle className="h-16 w-16 text-primary mx-auto" />
          <h2 className="font-display text-3xl font-bold">Check Your Email</h2>
          <p className="text-muted-foreground">
            We've sent a verification link to <strong className="text-foreground">{email}</strong>. Click the link to activate your account.
          </p>
          <Link to="/login">
            <Button variant="outline" className="mt-4">Back to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-primary" style={{ width: Math.random() * 300 + 50, height: Math.random() * 300 + 50, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.3 }} />
          ))}
        </div>
        <div className="relative z-10 text-center space-y-6">
          <img src={logo} alt="Top in Town" className="h-20 mx-auto" />
          <h1 className="font-display text-4xl font-bold text-foreground">
            Start Your <span className="text-gradient">Journey Today</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Get access to 5,000+ courses, expert instructors, and globally recognized certifications.
          </p>
          <div className="space-y-3 text-left max-w-sm mx-auto">
            {["Access to all course categories", "Track your learning progress", "Earn verifiable certificates", "24/7 support & community"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex justify-center mb-4">
            <img src={logo} alt="Top in Town" className="h-12" />
          </div>
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold">Create Account</h2>
            <p className="text-muted-foreground mt-2">Join thousands of learners worldwide</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12 bg-muted border-border/50" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-muted border-border/50" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 bg-muted border-border/50 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="h-12 bg-muted border-border/50" required />
            </div>

            <Button type="submit" className="w-full h-12 bg-gradient-primary text-accent-foreground font-semibold text-base" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><UserPlus className="h-5 w-5 mr-2" /> Create Account</>}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
