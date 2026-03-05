import { useState } from "react";
import { Search, CheckCircle2, XCircle, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const CertificateVerifyPage = () => {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setLoading(true);
    setSearched(true);
    const { data } = await supabase
      .from("certificates")
      .select("*, courses(title)")
      .eq("certificate_number", certId.trim())
      .single();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-16 max-w-xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Certificate Verification</h1>
          <p className="text-muted-foreground">Enter a certificate ID to verify its authenticity.</p>
        </div>

        <form onSubmit={handleVerify} className="flex gap-3 mb-8">
          <Input
            value={certId}
            onChange={e => setCertId(e.target.value)}
            placeholder="e.g. TTT-002809"
            className="bg-card border-border/50 h-12 text-base"
          />
          <Button type="submit" className="bg-gradient-primary text-accent-foreground h-12 px-6 shrink-0" disabled={loading}>
            <Search className="h-4 w-4 mr-2" /> Verify
          </Button>
        </form>

        {searched && !loading && (
          result ? (
            <div className="bg-card border border-border/50 rounded-xl p-8 text-center space-y-4">
              {result.status === "verified" ? (
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto" />
              ) : (
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-amber-400" />
                </div>
              )}
              <h2 className="font-display text-xl font-bold">
                {result.status === "verified" ? "✅ Certificate Verified" : "⏳ Verification Pending"}
              </h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Certificate ID:</strong> {result.certificate_number}</p>
                <p><strong>Course:</strong> {result.courses?.title || "N/A"}</p>
                <p><strong>Issued:</strong> {new Date(result.issued_at).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={result.status === "verified" ? "text-primary font-semibold" : "text-amber-400 font-semibold"}>{result.status?.toUpperCase()}</span></p>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-destructive/30 rounded-xl p-8 text-center">
              <XCircle className="h-12 w-12 text-destructive mx-auto mb-3" />
              <h2 className="font-display text-lg font-bold mb-1">Certificate Not Found</h2>
              <p className="text-sm text-muted-foreground">No certificate matches that ID. Please check and try again.</p>
            </div>
          )
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CertificateVerifyPage;
