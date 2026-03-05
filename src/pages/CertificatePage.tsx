import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const CertificatePage = () => {
  const { id } = useParams();
  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("certificates")
        .select("*, courses(title, duration)")
        .eq("id", id)
        .single();
      
      if (data) {
        // Fetch profile separately since there's no FK
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", data.user_id)
          .single();
        (data as any).profile_name = profile?.full_name;
      }
      setCert(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div className="flex items-center justify-center min-h-screen bg-[#f5f0e0]"><p>Loading certificate...</p></div>;
  if (!cert) return <div className="flex items-center justify-center min-h-screen"><p>Certificate not found</p></div>;

  const studentName = cert.profiles?.full_name || cert.profile_name || "Student";
  const courseName = cert.courses?.title || "Course";
  const issuedDate = new Date(cert.issued_at);
  const isVerified = cert.status === "verified";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 print:p-0 print:bg-white">
      <div className="relative w-[900px] aspect-[1.414/1] bg-[#f8f4e8] shadow-2xl print:shadow-none overflow-hidden" id="certificate">
        {/* Border design */}
        <div className="absolute inset-0 border-[12px] border-[#1a3a2a]" />
        <div className="absolute inset-[14px] border-[3px] border-[#c5a43e]" />
        
        {/* Corner decorations - gold triangles */}
        <div className="absolute top-0 left-0 w-32 h-32">
          <div className="absolute top-[18px] left-[18px] w-0 h-0 border-l-[60px] border-l-[#c5a43e] border-b-[60px] border-b-transparent opacity-30" />
        </div>
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-[18px] right-[18px] w-0 h-0 border-r-[60px] border-r-[#c5a43e] border-b-[60px] border-b-transparent opacity-30" />
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32">
          <div className="absolute bottom-[18px] left-[18px] w-0 h-0 border-l-[60px] border-l-[#c5a43e] border-t-[60px] border-t-transparent opacity-30" />
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32">
          <div className="absolute bottom-[18px] right-[18px] w-0 h-0 border-r-[60px] border-r-[#c5a43e] border-t-[60px] border-t-transparent opacity-30" />
        </div>

        {/* Bottom decorative bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-[#1a3a2a] via-[#2d5a3e] to-[#1a3a2a]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-16 py-12 text-center">
          {/* Header */}
          <h1 className="text-5xl font-bold text-[#1a5a2e] tracking-wider" style={{ fontFamily: "Georgia, serif" }}>
            CERTIFICATE
          </h1>
          <div className="bg-[#1a5a2e] text-white px-8 py-2 mt-3 mb-6">
            <span className="text-sm tracking-[0.3em] font-semibold">— OF COMPLETION —</span>
          </div>

          <p className="text-sm text-[#555] tracking-wider mb-2">THIS IS TO CERTIFY THAT</p>

          <h2 className="text-3xl font-bold text-[#222] mt-1 mb-3" style={{ fontFamily: "Georgia, serif" }}>
            {studentName.toUpperCase()}
          </h2>

          <p className="text-sm text-[#555] leading-relaxed max-w-lg">
            HAS SUCCESSFULLY COMPLETED THE <strong className="text-[#222]">{courseName}</strong><br />
            AT <span className="text-[#1a5a2e] font-semibold">TOP IN TOWN TECHNOLOGY</span>.
          </p>

          <p className="text-sm text-[#777] mt-3">
            {issuedDate.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })}
          </p>

          {/* Verified badge */}
          {isVerified && (
            <div className="absolute top-8 right-8 bg-[#1a5a2e] text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5">
              ✓ VERIFIED
            </div>
          )}

          {/* Bottom details */}
          <div className="flex items-end justify-between w-full mt-auto pt-8">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <img src={logo} alt="Top in Town" className="h-14 mb-1" />
              <span className="text-[9px] text-[#888] tracking-wider">TOP IN TOWN TECHNOLOGY</span>
            </div>

            {/* ID & Date */}
            <div className="text-center space-y-1">
              <p className="text-xs text-[#888]">ID Number: <strong className="text-[#555]">{cert.certificate_number}</strong></p>
              <p className="text-xs text-[#888]">Date of Achievement: <strong className="text-[#555]">{issuedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</strong></p>
            </div>

            {/* Signature */}
            <div className="flex flex-col items-center">
              <div className="w-28 border-b border-[#888] mb-1" />
              <span className="text-xs text-[#888] font-semibold tracking-wider">DIRECTOR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Print button */}
      <button
        onClick={() => window.print()}
        className="fixed bottom-6 right-6 bg-[#1a5a2e] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#155025] transition-colors print:hidden font-semibold"
      >
        🖨️ Print Certificate
      </button>
    </div>
  );
};

export default CertificatePage;
