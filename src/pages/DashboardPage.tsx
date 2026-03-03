import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Award, ShoppingCart, Clock, User, LogOut, Settings } from "lucide-react";

interface Enrollment {
  id: string;
  status: string;
  progress: number;
  enrolled_at: string;
  course: { title: string; slug: string; image_url: string; duration: string } | null;
}

const DashboardPage = () => {
  const { user, profile, roles, signOut } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [enrollRes, certRes] = await Promise.all([
        supabase.from("enrollments").select("id, status, progress, enrolled_at, courses(title, slug, image_url, duration)").eq("user_id", user.id),
        supabase.from("certificates").select("*").eq("user_id", user.id),
      ]);
      setEnrollments(
        (enrollRes.data || []).map((e: any) => ({ ...e, course: e.courses }))
      );
      setCertificates(certRes.data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const activeCount = enrollments.filter((e) => e.status === "active").length;
  const completedCount = enrollments.filter((e) => e.status === "completed").length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container py-8 space-y-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">
              Welcome back, <span className="text-gradient">{profile?.full_name || "Student"}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              {roles.includes("admin") && <span className="text-primary font-medium mr-2">Admin</span>}
              {roles.includes("corporate") && <span className="text-primary font-medium mr-2">Corporate</span>}
              {user?.email}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={signOut} className="border-border/50">
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Active Courses", value: activeCount, color: "text-primary" },
            { icon: Award, label: "Certificates", value: certificates.length, color: "text-amber-400" },
            { icon: Clock, label: "Completed", value: completedCount, color: "text-emerald-400" },
            { icon: ShoppingCart, label: "Total Enrolled", value: enrollments.length, color: "text-sky-400" },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-card border border-border/50 rounded-xl p-5">
              <Icon className={`h-6 w-6 ${color} mb-2`} />
              <p className="text-2xl font-bold font-display">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Enrolled Courses */}
        <div>
          <h2 className="font-display text-xl font-bold mb-4">My Courses</h2>
          {loading ? (
            <div className="text-muted-foreground">Loading...</div>
          ) : enrollments.length === 0 ? (
            <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-4">Start your learning journey today</p>
              <Link to="/courses">
                <Button className="bg-gradient-primary text-accent-foreground">Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrollments.map((e) => (
                <div key={e.id} className="bg-card border border-border/50 rounded-xl overflow-hidden group">
                  {e.course?.image_url && (
                    <img src={e.course.image_url} alt={e.course?.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-sm line-clamp-2">{e.course?.title}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{e.course?.duration}</span>
                      <span className={e.status === "completed" ? "text-emerald-400" : "text-primary"}>
                        {e.status === "completed" ? "Completed" : `${e.progress}% progress`}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${e.progress}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certificates */}
        {certificates.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold mb-4">My Certificates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="bg-card border border-border/50 rounded-xl p-5 flex items-center gap-4">
                  <Award className="h-10 w-10 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">{cert.certificate_number}</p>
                    <p className="text-xs text-muted-foreground">Issued {new Date(cert.issued_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
