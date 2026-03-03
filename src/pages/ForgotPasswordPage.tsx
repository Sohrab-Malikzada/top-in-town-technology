import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    setIsLoading(true);
    const { error } = await resetPassword(email);
    setIsLoading(false);
    if (error) { toast.error(error.message); } else { setSent(true); }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center"><img src={logo} alt="Top in Town" className="h-12" /></div>
        {sent ? (
          <div className="text-center space-y-4">
            <Mail className="h-16 w-16 text-primary mx-auto" />
            <h2 className="font-display text-2xl font-bold">Check Your Email</h2>
            <p className="text-muted-foreground">We've sent a password reset link to <strong className="text-foreground">{email}</strong>.</p>
            <Link to="/login"><Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Login</Button></Link>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="font-display text-2xl font-bold">Reset Password</h2>
              <p className="text-muted-foreground mt-2">Enter your email to receive a reset link</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-muted border-border/50" required />
              </div>
              <Button type="submit" className="w-full h-12 bg-gradient-primary text-accent-foreground font-semibold" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>
            <p className="text-center text-sm"><Link to="/login" className="text-primary hover:underline"><ArrowLeft className="h-3 w-3 inline mr-1" />Back to Login</Link></p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
